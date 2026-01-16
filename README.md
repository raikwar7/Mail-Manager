# 📧 SmartMail AI – Intelligent Email Management & Follow‑Up System

SmartMail AI is a full‑stack, AI‑powered email management platform designed to **send, track, categorize, and follow up on emails automatically**. It is especially useful for **job applications, cold emailing, and business outreach**, combining **LLMs, automation, and system‑design best practices**.

---

## 🚀 Problem Statement

Managing job applications and business emails manually is inefficient:

* No structured tracking of sent emails
* Missed follow‑ups
* Poor visibility into replies and outcomes
* Repetitive email writing

**SmartMail AI solves this by acting as an intelligent email assistant.**

---

## ✨ Key Features

### 1️⃣ Email Sending with Templates

* Gmail OAuth‑based master email integration
* Pre‑built templates:

  * Job Application
  * Cold Email
  * Business Proposal
* Dynamic variables:

  ```
  {{company}}, {{role}}, {{recruiter_name}}
  ```
* Template versioning

---

### 2️⃣ Inbox & Email Receiving

* Fetch emails directly from Gmail
* Thread‑based conversation view
* Auto‑labeling (like Gmail)
* Priority Inbox (important emails first)

---

### 3️⃣ AI Email Categorization (Core AI Feature)

Automatically classifies emails into:

* Job Application
* Interview
* Rejection
* Offer
* Business
* General

**Classification uses:**

* Subject
* Email body
* Sender domain

---

### 4️⃣ Application & Business Tracker ⭐ (Differentiator)

#### Job Tracker

* Company name
* Role
* Applied date
* Status:

  * Applied
  * Response
  * Interview
  * Rejected
  * Offer

#### Business Tracker

* Client name
* Proposal sent date
* Deal status

✅ Auto‑created when an email is sent
✅ Auto‑updated when a reply is received

---

### 5️⃣ Follow‑Up Automation

* Auto follow‑ups after X days (default: 7)
* Follow‑up types:

  * Gentle reminder
  * Second follow‑up
  * Final follow‑up
* Automatically stops after a reply

---

### 6️⃣ Email Tracking & Analytics

* Open tracking (tracking pixel)
* Reply detection
* Metrics:

  * Open rate
  * Reply rate
  * Time‑to‑reply
  * Best time to send emails

---

### 7️⃣ AI Email Generator (LLM Powered)

* Generate:

  * Cold emails
  * Job applications
  * Follow‑ups
  * Replies
* Controls:

  * Tone (formal / friendly)
  * Length
  * Purpose
* "Improve My Email" feature

---

### 8️⃣ Security & Privacy

* OAuth 2.0 authentication
* Encrypted token storage
* No password storage
* Scoped Gmail permissions

---

## 🏗 High‑Level Architecture

```
Frontend (React)
   |
   | REST APIs
   v
Backend (FastAPI)
   |
   |-- Gmail Service
   |-- AI Service (LLM)
   |-- Tracking Service
   |-- Follow‑Up Scheduler
   |
Database (MySQL)
   |
AWS Infrastructure
```

---

## 🧰 Tech Stack

### Frontend

* React.js
* Tailwind CSS / Material UI
* Axios
* React Query
* Google OAuth

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Celery (async jobs)
* Redis (task queue)

### AI / NLP

* OpenAI / Gemini / Claude API
* Prompt‑based classification
* LLM‑generated emails

### Database

* MySQL (AWS RDS)

### Cloud & DevOps

* AWS EC2 / ECS
* AWS RDS (MySQL)
* AWS S3 (attachments)
* CloudWatch (logs)
* EventBridge / Cron (scheduled follow‑ups)

---

## 🗄 Database Schema (Simplified)

### emails

| Field       | Type     |
| ----------- | -------- |
| id          | int      |
| sender      | string   |
| receiver    | string   |
| subject     | text     |
| body        | text     |
| category    | string   |
| sent_at     | datetime |
| received_at | datetime |
| thread_id   | string   |
| opened      | boolean  |

### trackers

| Field              | Type           |
| ------------------ | -------------- |
| id                 | int            |
| email_id           | int            |
| type               | job / business |
| company            | string         |
| role               | string         |
| status             | string         |
| last_followup_date | datetime       |

---

## 🧪 Development Roadmap

### Phase 1 – MVP

* Gmail OAuth
* Email sending via templates
* Inbox display
* Manual categorization

### Phase 2 – AI Integration

* Auto email classification
* AI email generation
* Tracker auto‑creation

### Phase 3 – Automation

* Follow‑up scheduler
* Auto follow‑up emails
* Open tracking

### Phase 4 – Analytics & Polish

* Dashboard
* Performance charts
* UI/UX improvements

---

## 📐 System Design Concepts (Interview Ready)

* MVC Architecture
* OAuth 2.0 Authentication
* Asynchronous task queues (Celery + Redis)
* Event‑driven architecture
* Secure token storage
* Rate limiting & retries
* Microservice‑ready design
* Scalable email processing

---

## 💡 Why This Project Stands Out

✔ Real‑world problem
✔ AI + Automation
✔ Strong system design
✔ Full‑stack implementation
✔ Resume & interview friendly
✔ Startup‑ready idea

---

## 📌 Future Enhancements

* Bulk email campaigns
* Chrome extension
* Resume‑JD matching
* Calendar interview sync
* Mobile app

---

## 👨‍💻 Author

**Divyansh Singh Raikwar**
AI & Full‑Stack Developer

---

⭐ If you like this project, don’t forget to star the repo!
