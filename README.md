# ArthSaathi — Your Financial Companion 🌱

**ArthSaathi** (*"Financial Companion"*) is a fully offline, multi-agent financial literacy platform built for **Nomura KakushIN 10.0** by Team ArthMinds (SGSITS, Indore). It delivers hyper-personalized financial guidance to underserved Indians — gig workers, farmers, salaried employees, and persons with disabilities — without relying on any external APIs or internet connectivity.

## 🎯 Problem

Millions of Indians remain financially illiterate despite wide digital access. Existing tools fail to scale across languages, literacy levels, irregular incomes, and accessibility needs — leaving people vulnerable to predatory schemes and locked out of personalized advice.

## 💡 Solution

ArthSaathi simulates a multi-agent architecture entirely on-device:

- **SaathiBot** — Rule-based conversational assistant for financial queries
- **BudgetGuard** — Adaptive budgeting engine for fixed, gig, and seasonal incomes
- **ScamAlert** — Pattern-based fraud and scam detection
- **GovernmentSchemes Agent** — Matches users to relevant government schemes (PM-KISAN, crop insurance, disability benefits) from a local dataset
- **FinanceCoach** — Gamified micro-lessons and quizzes for sustained financial learning

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router |
| Charts | Recharts |
| Icons | Lucide React |
| State & Storage | React Context API, localStorage |
| Logic Engine | Custom rule-based JS (no external AI APIs) |
| Voice (optional) | Web Speech API (browser-native) |

> **Note:** This project intentionally avoids external APIs (LLMs, Firebase, Bhashini) to remain fully functional in offline, no-internet hackathon environments.

## 🚀 Getting Started

```bash
git clone https://github.com/raj-1807/arthsaathi.git
cd arthsaathi
npm install
npm run dev
```

Visit `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/   # Navbar, AgentBadge, shared UI
├── context/      # UserContext (global state + localStorage)
├── data/         # Static schemes & response datasets
├── engine/       # Budget calculator, intent router, scoring logic
└── pages/        # Onboarding, Dashboard, Chat, Budget, Learn
```

## 👥 Team ArthMinds

- **Raj Barsaiya** — UG III Year, B.Tech IT, SGSITS Indore — [GitHub](https://github.com/raj-1807)
- **Satakshi Rathod** — UG III Year, B.Tech IT, SGSITS Indore — [GitHub](https://github.com/satakshirathod)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---
Built for Nomura KakushIN 10.0 · SGSITS, Indore