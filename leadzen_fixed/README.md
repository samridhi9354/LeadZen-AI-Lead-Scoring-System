# ⚡ LeadZen — AI Lead Scoring System

> Score your sales leads with **91.5% accuracy** using XGBoost. Classify Hot / Warm / Cold leads instantly from a CSV upload.

---

## 🗂️ Project Structure

```
LeadZen/
├── index.html          ← Homepage
├── analyze.html        ← Upload & Analyze leads
├── dashboard.html      ← Model metrics & charts
├── about.html          ← About, How It Works, Tech Stack
├── backend_app.py      ← Flask REST API (serves site + API)
├── requirements.txt    ← Python dependencies
├── css/
│   └── global.css      ← Shared styles, dark/light theme
├── js/
│   ├── shared.js       ← Theme toggle, toast, modal, utils
│   └── layout.js       ← Nav & footer templates
├── models/
│   ├── lead_classifier.json    ← Pre-trained XGBoost model
│   └── pipeline_encoders.pkl   ← Saved label encoders
└── Datasets/
    ├── training_leads_10k.csv  ← Training dataset
    └── test_leads_labeled.csv  ← Validation dataset
```

---

## 🚀 Quick Start

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python backend_app.py
```

### 3. Open in Browser
Navigate to: **http://localhost:5000**

The Flask server serves both the website AND the API on the same port.

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with hero, features, cohort guide |
| Analyze | `/analyze.html` | Upload CSV, run inference, view results |
| Dashboard | `/dashboard.html` | Model metrics, confusion matrix, feature importance |
| About | `/about.html` | How it works, tech stack, dataset columns |

---

## 🌙 Features

- **Dark / Light Mode** — Toggle with the ☀️/🌙 button in the nav. Preference is saved.
- **Drag & Drop Upload** — Drop any CSV with the required columns
- **Demo Mode** — Click "Load Demo" on the Analyze page — works without a server
- **Filter & Search** — Filter by Hot/Warm/Cold, search by company name
- **Export CSV** — Download results with predicted cohorts and confidence scores
- **Confidence Bars** — Visual probability breakdown per lead
- **Detail Modal** — Click any lead for full probability breakdown

---

## 📡 API Endpoints

```
GET  /api/health       → Model status, mode, accuracy
POST /api/predict      → Upload CSV → JSON predictions
```

### POST /api/predict
**Request:** `multipart/form-data` with `file` field (CSV)

**Response:**
```json
{
  "success": true,
  "total": 200,
  "distribution": {"Hot": 80, "Warm": 60, "Cold": 60},
  "results": [
    {
      "id": 1,
      "company_name": "Apex Solutions",
      "predicted_cohort": "Hot",
      "confidence": 94.2,
      "prob_hot": 94.2,
      "prob_warm": 4.1,
      "prob_cold": 1.7,
      ...
    }
  ]
}
```

---

## 🧠 Model Specs

| Parameter | Value |
|-----------|-------|
| Algorithm | XGBoost Classifier |
| max_depth | 4 |
| n_estimators | 300 |
| learning_rate | 0.1 |
| subsample | 1.0 |
| colsample_bytree | 0.6 |
| objective | multi:softprob |
| num_class | 3 |
| Overall Accuracy | **91.5%** |
| Hot Recall | **95%** |
| Cold Precision | **98%** |
| Training Set | **10,000 leads** |

---

## 📊 Required CSV Columns

Your input CSV should have these columns:

```
Company Name, Industry, Company Size, Annual Revenue, Location,
Growth Stage, No. of Repetitive Tasks, Current Workflow Type,
Process Complexity, Integration Requirements, Hours Wasted/Week,
Error Rate (%), Budget Range, Making Loss, Contact Role,
Decision Authority, Prev Automation Exp, Website Visits,
Demo Requested, Emails Opened, Timeline, Use Case Interest
```

See `Datasets/test_leads_labeled.csv` for a working example.

---

Built with ❤️ · XGBoost · Flask · Vanilla JS · No frameworks needed
