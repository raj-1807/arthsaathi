// Rule-based response bank — categorized by intent. No external API needed.

export const INTENTS = [
  {
    id: "savings",
    keywords: ["save", "saving", "savings", "bachat", "jama"],
    response: (user) =>
      `${user.name}, a good rule is to save at least 15-20% of your income before spending. Since you're a ${user.incomeType} earner, try setting aside a fixed amount right when you receive money, before other expenses.`,
  },
  {
    id: "loan",
    keywords: ["loan", "debt", "borrow", "karz", "udhar", "emi"],
    response: (user) =>
      `Before taking a loan, ${user.name}, check: 1) Is the interest rate below 12-14% per year? 2) Can your monthly income cover the EMI comfortably? Avoid lenders who ask for upfront fees or don't give written documents — that's a common scam pattern.`,
  },
  {
    id: "investment",
    keywords: [
      "invest",
      "investment",
      "mutual fund",
      "sip",
      "stock",
      "share market",
    ],
    response: (user) =>
      `Investing is great once you have 3-6 months of expenses saved as an emergency fund first, ${user.name}. After that, low-cost options like Post Office schemes, PPF, or SIPs in mutual funds are good starting points. Avoid anyone promising guaranteed high returns — that's a red flag.`,
  },
  {
    id: "scam",
    keywords: [
      "scam",
      "fraud",
      "fake",
      "cheat",
      "otp",
      "suspicious",
      "call",
      "whatsapp message",
    ],
    response: () =>
      `⚠️ Stay alert! Never share your OTP, PIN, or bank password with anyone — not even someone claiming to be from your bank. Real banks never ask for this. If you got a suspicious message promising quick money, it's almost certainly a scam. Want me to check a specific message for you?`,
  },
  {
    id: "scheme",
    keywords: [
      "scheme",
      "yojana",
      "government",
      "pm-kisan",
      "subsidy",
      "pension",
    ],
    response: () =>
      `There are several government schemes that might help you. Head to the Learn section or ask me about a specific scheme like PM-KISAN, crop insurance, or disability pension, and I'll tell you if you qualify.`,
  },
  {
    id: "budget",
    keywords: ["budget", "expense", "spending", "kharch"],
    response: () =>
      `I can help you build a budget! Head over to BudgetGuard and enter your monthly expenses — I'll calculate your savings capacity and suggest a personalized plan.`,
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "namaste", "hey"],
    response: (user) =>
      `Namaste ${user.name}! I'm SaathiBot, your financial companion. Ask me about savings, loans, investments, scams, or government schemes.`,
  },
];

export const FALLBACK_RESPONSE =
  "I'm still learning! Try asking me about savings, loans, investments, scam alerts, or government schemes.";
