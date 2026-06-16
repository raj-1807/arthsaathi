// Core budgeting logic — works fully offline, no APIs.

export function calculateBudget({ monthlyIncome, incomeType, expenses }) {
  const income = Number(monthlyIncome) || 0
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (Number(val) || 0), 0)
  const surplus = income - totalExpenses

  // Irregular incomes (gig/farmer) get a higher safety buffer recommendation
  const bufferRate = incomeType === 'farmer' || incomeType === 'gig' ? 0.25 : 0.15
  const recommendedSavings = Math.round(income * bufferRate)

  let plan = 'balanced'
  if (surplus < 0) plan = 'deficit'
  else if (surplus > recommendedSavings * 1.5) plan = 'accelerated'
  else if (surplus < recommendedSavings * 0.5) plan = 'conservative'

  const planMessages = {
    deficit: 'Your expenses exceed your income. Let’s look at where to cut back first.',
    conservative: 'You have a small surplus. Focus on building a basic emergency fund first.',
    balanced: 'You’re on track. Keep saving steadily and build a 3-month emergency fund.',
    accelerated: 'Great surplus! Consider starting an investment or insurance plan alongside savings.',
  }

  return {
    income,
    totalExpenses,
    surplus,
    recommendedSavings,
    plan,
    message: planMessages[plan],
  }
}

export function healthScoreFromBudget(budgetResult) {
  const { income, surplus, recommendedSavings } = budgetResult
  if (income === 0) return 50
  let score = 50
  const savingsRate = surplus / income
  score += Math.round(savingsRate * 100)
  if (surplus >= recommendedSavings) score += 10
  return Math.max(0, Math.min(100, score))
}

import { INTENTS, FALLBACK_RESPONSE } from "../data/responses";

export function getAgentResponse(message, user) {
  const lower = message.toLowerCase();
  for (const intent of INTENTS) {
    if (intent.keywords.some((kw) => lower.includes(kw))) {
      return { text: intent.response(user), agent: intent.id };
    }
  }
  return { text: FALLBACK_RESPONSE, agent: "fallback" };
}
// ScamAlert — pattern-based fraud risk scoring, fully offline.

const SCAM_PATTERNS = [
  { pattern: /otp/i, weight: 30, reason: 'Asks for OTP — banks never ask this' },
  { pattern: /pin|password/i, weight: 30, reason: 'Asks for PIN/password — never share this' },
  { pattern: /lottery|lucky winner|won.*prize/i, weight: 25, reason: 'Unsolicited prize/lottery claim' },
  { pattern: /urgent|immediately|act now|expire/i, weight: 15, reason: 'Creates false urgency' },
  { pattern: /click.*link|click here/i, weight: 20, reason: 'Suspicious link request' },
  { pattern: /guaranteed.*return|double.*money|100%.*profit/i, weight: 25, reason: 'Unrealistic guaranteed returns' },
  { pattern: /kyc.*update|account.*block|verify.*account/i, weight: 25, reason: 'Fake KYC/account verification pressure' },
  { pattern: /pay.*fee|advance.*payment|processing.*charge/i, weight: 20, reason: 'Upfront fee request — common scam tactic' },
  { pattern: /whatsapp.*job|work from home.*earn/i, weight: 20, reason: 'Suspicious WhatsApp job offer pattern' },
]

export function analyzeScamRisk(message) {
  let score = 0
  const reasons = []

  for (const { pattern, weight, reason } of SCAM_PATTERNS) {
    if (pattern.test(message)) {
      score += weight
      reasons.push(reason)
    }
  }

  score = Math.min(100, score)

  let level = 'low'
  if (score >= 60) level = 'high'
  else if (score >= 30) level = 'medium'

  return { score, level, reasons }
}