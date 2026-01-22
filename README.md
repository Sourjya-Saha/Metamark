

# 🏷️ MetaMark

## AI-Driven Automated Legal Metrology Compliance Checker

**Smart India Hackathon 2025 Winners | Team Code Nirvana**

---

## 📌 Overview

**MetaMark** is an **AI-driven, hardware-assisted compliance verification system** designed to automatically validate **Legal Metrology declarations on e-commerce platforms**.

The system combines **Vision AI, LLM reasoning, cloud microservices, and IoT-based hardware validation** to detect misleading packaging, incorrect declarations, and regulatory violations—**before products go live** on marketplaces.

> 🏛️ **Problem Statement ID:** SIH25057
> 🏢 **Ministry:** Consumer Affairs, Food & Public Distribution
> 🧠 **Theme:** Miscellaneous
> ⚙️ **Category:** Hardware

---

## 🎯 Problem Statement

E-commerce platforms face persistent challenges such as:

* Incorrect MRP, quantity, origin, and expiry declarations
* Fake labels, overwritten MRPs, and misleading packaging
* Manual audits that are slow, costly, and error-prone
* Lack of real-time, audit-ready compliance insights

**MetaMark solves this by enforcing compliance through automation, AI reasoning, and sensor-based physical validation.**

---

## 💡 Solution Summary

MetaMark provides:

* **Automated label extraction** from product images
* **AI-driven compliance validation** against Legal Metrology rules
* **Confidence-weighted compliance scoring**
* **Auto-generated violation explanations & remediation**
* **Hardware-assisted physical verification**
* **Audit-ready, traceable compliance reports**

---

## 🧠 High-Level Architecture

```
E-Commerce Listing
       │
       ▼
Image + Metadata Input
       │
       ▼
Vision AI (OCR + Object Detection)
       │
       ▼
Gemini LLM Compliance Engine
       │
       ▼
Compliance Score + Violations
       │
       ▼
Pre-Upload Validation / Audit Engine
       │
       ▼
Dashboard + Reports + Heatmaps
```

*(Derived from Level-1 & Level-2 process flow diagrams in the PPT)* 

---

## ✨ Key Features

### 🔍 AI-Based Label & Declaration Analysis

* Multilingual OCR using **Google Vision**
* Object detection (bottles, packets, containers)
* Extracts **25+ legal attributes** (MRP, weight, origin, expiry, etc.)

---

### 🧠 LLM-Powered Compliance Reasoning

* Uses **Gemini 2.0** for:

  * Rule interpretation
  * Violation reasoning
  * Actionable remediation suggestions
* Dynamically adapts to **updated Legal Metrology rules**

---

### 📊 Confidence-Weighted Compliance Scoring

* Combines:

  * OCR confidence
  * Semantic correctness
* Outputs:

  * Final compliance grade (A+, A, B…)
  * Violation breakdown

---

### 🚦 Pre-Upload Validation Engine

* Prevents non-compliant listings **before publication**
* Reduces delisting cost & manual audits
* Generates readiness scores for sellers

---

### 🌍 Real-Time Compliance Heatmap

* Tracks compliance across:

  * Manufacturers
  * Importers
  * Packers
* Identifies repeat offenders & systemic issues

---

## ⚙️ Technical Architecture

### 🧩 Software Stack

| Layer     | Technologies                     |
| --------- | -------------------------------- |
| Frontend  | React, Vite                      |
| Backend   | Flask (Microservices)            |
| AI        | Google Vision OCR, Gemini 2.0    |
| Scraping  | Selenium, BeautifulSoup          |
| Database  | MySQL                            |
| Cloud     | AWS / GCP, S3                    |
| Analytics | Python (Statistical Aggregation) |

---

### 🔄 AI Processing Pipeline

1. **Dynamic Web Crawler**

   * Scrapes live e-commerce listings
2. **Vision AI OCR**

   * Extracts text + visual cues
3. **LLM Compliance Engine**

   * Validates against metrology rules
4. **Auto-Remediation Engine**

   * Maps violations → fixes
5. **Scoring & Reporting**

   * Generates audit-ready reports

---

## 🧪 Hardware Innovation (Key Differentiator)

MetaMark uniquely combines **physical verification hardware** with AI.

### 🔩 Hardware Components

| Module            | Purpose                          |
| ----------------- | -------------------------------- |
| TOF Sensor        | Measures package dimensions      |
| Load Cell + HX711 | Weight verification              |
| MPU6050           | Motion & vibration analysis      |
| UV + IR Scanner   | Detects fake labels & overwrites |
| ESP32 + BLE       | Low-power communication          |

---

### 📦 Hardware Capabilities

* Detects **under-filled packages**
* Identifies **fake holograms & reprinted expiry**
* Verifies **declared vs actual weight & volume**
* Portable, **mobile-mountable design**


---

## 🖼️ Screenshots & Prototype

### 🔹 Compliance Dashboard
![Compliance Dashboard](docs/screenshots/Dashboard.png)

### 🔹 AI Compliance Analysis – Demo 1
![Demo 1](docs/screenshots/demo1.png)

### 🔹 AI Compliance Analysis – Demo 2
![Demo 2](docs/screenshots/demo2.png)

### 🔹 AI Compliance Analysis – Demo 3
![Demo 3](docs/screenshots/demo3.png)

### 🔹 Hardware Prototype (Sensor-Based Verification)
![Hardware Prototype](docs/screenshots/hardwaredemo.jpg)




---

## 📈 Impact & Benefits

### 👥 Social Impact

* Strengthens seller accountability
* Protects consumers from misleading packaging
* Improves trust in Indian e-commerce

### 💰 Economic Impact

* Reduces manual compliance costs
* Prevents costly delistings
* Scales efficiently via batch processing

### 🌱 Environmental Impact

* Reduces packaging waste
* Minimizes physical audits
* Lowers carbon footprint

---

## 🧪 Feasibility & Risk Mitigation

### Challenges

* Complex AI-hardware integration
* Cloud & API costs
* Seller adoption resistance

### Mitigations

* Modular microservices
* Hybrid AI pipelines with caching
* Explainable AI dashboards

---

## 🪙 Meta-Token Reward System (Future Scope)

* Users earn **Meta-Tokens** via affiliate purchases
* Tokens redeemable for gift cards
* Improves adoption & retention

---

## 📚 Research References

* *Large Scale Generative Multimodal Attribute Extraction* — Khandelwal et al., 2023
* *Automating Compliance Evidence Extraction with ML* — Olatunji et al., 2025
* 🎥 **Live Demo:** [https://youtu.be/xZJdHqtpcVk](https://youtu.be/xZJdHqtpcVk)

---

## 👨‍💻 Team

**Team Code Nirvana**
Smart India Hackathon 2025

---
