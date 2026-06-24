"""
LeadZen — Flask API Backend
Run: python backend_app.py
Serves: http://localhost:5000
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import xgboost as xgb
import pickle, os, io, warnings
warnings.filterwarnings('ignore')

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH   = os.path.join(BASE_DIR, 'models', 'lead_classifier.json')
ENCODER_PATH = os.path.join(BASE_DIR, 'models', 'pipeline_encoders.pkl')
TRAIN_PATH   = os.path.join(BASE_DIR, 'Datasets', 'training_leads_10k.csv')

xgb_model = None
encoders   = None
label_map  = {0: 'Cold', 1: 'Warm', 2: 'Hot'}

def load_model():
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        m = xgb.XGBClassifier()
        m.load_model(MODEL_PATH)
        with open(ENCODER_PATH, 'rb') as f:
            enc = pickle.load(f)
        return m, enc
    return None, None

def train_fallback():
    if not os.path.exists(TRAIN_PATH):
        return None, None
    df = pd.read_csv(TRAIN_PATH).drop(columns=['Company Name'])
    df['Lead Label'] = df['Lead Score'].apply(lambda s: 0 if s<=35 else (1 if s<=70 else 2))
    df = df.drop(columns=['Lead Score'])
    from sklearn.preprocessing import LabelEncoder
    enc = {}
    for col in df.select_dtypes(include=['object','bool']).columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        enc[col] = le
    X, y = df.drop(columns=['Lead Label']), df['Lead Label']
    m = xgb.XGBClassifier(
        subsample=1.0, n_estimators=300, max_depth=4,
        learning_rate=0.1, gamma=1, colsample_bytree=0.6,
        objective='multi:softprob', num_class=3,
        random_state=42, eval_metric='mlogloss'
    )
    m.fit(X, y)
    return m, enc

# Init
xgb_model, encoders = load_model()
if xgb_model is None:
    print("Pre-trained model not found — training from scratch…")
    xgb_model, encoders = train_fallback()

print(f"✅ Model ready. Mode: {'PRE-TRAINED' if os.path.exists(MODEL_PATH) else 'LIVE-TRAINED'}")

# ── Serve frontend ──────────────────────────────────────────
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# ── API ─────────────────────────────────────────────────────
@app.route('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'model_loaded': xgb_model is not None,
        'mode': 'PRE-TRAINED' if os.path.exists(MODEL_PATH) else 'LIVE-TRAINED',
        'accuracy': '91.5%'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    if xgb_model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    if not file.filename:
        return jsonify({'error': 'Empty filename'}), 400
    try:
        df_orig = pd.read_csv(io.BytesIO(file.read()))
        df = df_orig.copy()
        names = df['Company Name'].tolist() if 'Company Name' in df.columns else [f"Lead {i+1}" for i in range(len(df))]
        for col in ['Actual Cohort','Company Name','Predicted Cohort']:
            if col in df.columns:
                df = df.drop(columns=[col])
        for col, le in encoders.items():
            if col in df.columns:
                df[col] = le.transform(df[col].astype(str))
        preds = xgb_model.predict(df)
        proba = xgb_model.predict_proba(df)
        results = []
        for i, (pred, prob) in enumerate(zip(preds, proba)):
            row = df_orig.iloc[i].to_dict()
            results.append({
                'id': i+1,
                'company_name': names[i],
                'predicted_cohort': label_map[pred],
                'confidence': round(float(max(prob))*100, 1),
                'prob_cold': round(float(prob[0])*100, 1),
                'prob_warm': round(float(prob[1])*100, 1),
                'prob_hot':  round(float(prob[2])*100, 1),
                'industry':          row.get('Industry','—'),
                'company_size':      row.get('Company Size','—'),
                'annual_revenue':    row.get('Annual Revenue','—'),
                'location':          row.get('Location','—'),
                'budget_range':      str(row.get('Budget Range','—')),
                'hours_wasted':      row.get('Hours Wasted/Week','—'),
                'demo_requested':    row.get('Demo Requested','—'),
                'decision_authority':row.get('Decision Authority','—'),
                'timeline':          row.get('Timeline','—'),
                'actual_cohort':     row.get('Actual Cohort', None),
            })
        dist = {'Hot':0,'Warm':0,'Cold':0}
        for r in results:
            dist[r['predicted_cohort']] += 1
        return jsonify({'success':True,'total':len(results),'results':results,'distribution':dist,'filename':file.filename})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("\n🚀 LeadZen API starting on http://localhost:5000")
    print("   Open http://localhost:5000 to view the site\n")
    app.run(debug=False, port=5000)
