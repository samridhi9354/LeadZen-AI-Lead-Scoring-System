# LeadZen - AI Lead Scoring System

An AI-powered lead qualification platform that predicts whether a sales lead is **Hot**, **Warm**, or **Cold** using a trained **XGBoost Classifier** with **91.5% accuracy**.

LeadZen helps sales teams prioritize high-converting prospects by automatically analyzing lead attributes and generating confidence-based predictions from uploaded CSV files.

---

## Overview

LeadZen is an end-to-end machine learning application that combines a trained XGBoost model with a Flask backend and an interactive web interface. Users can upload lead data in CSV format and receive instant lead classifications along with confidence scores and analytics.

---

## Features

* AI-powered lead classification (Hot, Warm, Cold)
* XGBoost model with 91.5% accuracy
* CSV upload and batch prediction
* Interactive analytics dashboard
* Search and filter functionality
* Export predictions as CSV
* Confidence score visualization
* Dark and Light theme support
* Flask REST API backend
* Responsive user interface built with Vanilla JavaScript

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Chart.js

### Backend

* Python
* Flask

### Machine Learning

* XGBoost
* Scikit-Learn
* Pandas
* NumPy

### Deployment

* GitHub
* Render

---

## Project Structure

```text
LeadZen/
├── index.html
├── analyze.html
├── dashboard.html
├── about.html
├── backend_app.py
├── requirements.txt
├── css/
├── js/
├── models/
└── Datasets/
```

---

## Model Performance

| Metric           | Value   |
| ---------------- | ------- |
| Accuracy         | 91.5%   |
| Hot Recall       | 95%     |
| Cold Precision   | 98%     |
| Training Samples | 10,000+ |

### Model Configuration

* Algorithm: XGBoost Classifier
* max_depth: 4
* n_estimators: 300
* learning_rate: 0.1
* objective: multi:softprob
* Number of Classes: 3

---

## How It Works

1. Upload a CSV file containing lead information.
2. The Flask backend validates and preprocesses the data.
3. The trained XGBoost model generates prediction probabilities.
4. Leads are categorized into Hot, Warm, or Cold cohorts.
5. Results are displayed with confidence scores and analytics.

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns model status and performance information.

### Predict Leads

```http
POST /api/predict
```

Accepts a CSV file and returns lead predictions with confidence scores.

---

## Required Input Fields

```text
Company Name
Industry
Company Size
Annual Revenue
Location
Growth Stage
No. of Repetitive Tasks
Current Workflow Type
Process Complexity
Integration Requirements
Hours Wasted/Week
Error Rate (%)
Budget Range
Making Loss
Contact Role
Decision Authority
Prev Automation Exp
Website Visits
Demo Requested
Emails Opened
Timeline
Use Case Interest
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/LeadZen-AI-Lead-Scoring-System.git
cd LeadZen-AI-Lead-Scoring-System
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Application

```bash
python backend_app.py
```

Open:

```text
http://localhost:5000
```

---

## Screenshots

### Home Page

Add screenshot here

### Lead Analysis

Add screenshot here

### Dashboard

Add screenshot here

---

## Key Learnings

* Machine Learning model deployment
* Flask API development
* Data preprocessing and feature engineering
* XGBoost multiclass classification
* Frontend-backend integration
* Interactive dashboard development
* End-to-end ML application deployment

---

## Future Improvements

* Real-time lead scoring via API
* User authentication and role management
* CRM integration
* Model retraining pipeline
* Advanced lead analytics and reporting

---

## Author

Samridhi Shrivastava

