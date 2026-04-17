<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<h1 align="center">Sentinel.ai 🧠 Shielding Digital Minds</h1>
<p align="center">
  <em>A localized, zero-latency NLP engine for real-time mental health crisis intervention. Built for the <strong>TENSOR '26 Hackathon</strong>.</em>
</p>

---

## 📖 Overview

**Sentinel AI** is a comprehensive, privacy-preserving mental health crisis signal detection system. It actively monitors textual input (from social platforms like Discord) to identify and triage distress signals efficiently without relying on sluggish, insecure third-party APIs. 

By separating the **Core Engine** (a bespoke, blazing-fast Naive Bayes machine learning inference unit) from the **Analytics Engine** (Google Gemini API for abstract cluster analysis), Sentinel AI achieves the perfect balance of latency, privacy, and contextual comprehension.

## ✨ Core Features

- 🕵️‍♂️ **Local Privacy Triage (Zero-Data Leak)**: Classifies mental health states instantly locally via a custom JavaScript mathematical engine without parsing your raw chat data to external servers.
- 🤖 **Discord Integration Layer**: Auto-moderates Discord communities. Flags `"Crisis"` and `"Moderate"` messages, alerts mods out-of-band, and direct-messages users with actionable help resources.
- 📊 **"Mission Control" Dashboard**: Built with React & Vite. A stunning, dark-mode glassmorphic UI displaying real-time confidence metric charts, historical psych-analysis, and intervention logs.
- 🧠 **Gemini Synthesizer**: Periodically summarizes clustered data to provide overarching clinical themes to moderation support teams.

---

## 🛠️ Tech Stack

- **Frontend Application:** React 18, Vite, Tailwind CSS, Recharts, Lucide Icons
- **ML / Backend:** Vanilla JavaScript (ES6 Modules) - Custom TF-IDF/Naive Bayes Probabilistic Engine
- **Bot Integration:** Discord.js (`v14`)
- **Generative AI:** `@google/generative-ai` (Gemini API)

---

## 🚀 Getting Started

Follow these steps to run the complete environment locally, including the Dashboard and the Discord Bot.

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- A **Discord Developer Account** (For creating a bot and obtaining a token)
- A **Gemini API Key** (From Google AI Studio)

### 2. Installation
Clone the repository and install the NPM packages:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (or update the existing one) with the following variables:
```env
# Your Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Your Discord Bot Token
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```

### 4. Running the Ecosystem

Sentinel AI utilizes two independent layers. For the full experience, run both simultaneously in separate terminal windows.

#### Start the Dashboard (Frontend)
```bash
npm run dev
```
> The dashboard will be accessible via `http://localhost:5173`. Run your manual analysis and view historical cluster data here.

#### Start the Intelligence Bot Layer (Discord)
```bash
node bot.js
```
> Ensure that you have enabled **Message Content Intent** in your Discord Developer portal, or the bot will silently ignore messages.

---

## 🛡️ Hackathon Deliverable - Phase 5 (TENSOR '26)
This project was constructed as the definitive submission for TENSOR '26. See `research_paper.md` within this repository for our detailed methodology, algorithmic complexity breakdown, and system architecture mapping.

---
<p align="center">
  <em>"Your life has immense value. Let the machines watch the waves so you can keep breathing."</em>
</p>
