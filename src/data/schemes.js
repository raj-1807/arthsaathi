// Static government schemes dataset — fully offline, no API calls.

export const SCHEMES = [
  {
    id: "pm-kisan",
    name: "PM-KISAN",
    description:
      "Income support of ₹6,000/year for small and marginal farmers, paid in 3 installments.",
    eligibility: (user) => user.incomeType === "farmer",
    applyHint:
      "Visit pmkisan.gov.in or your nearest Common Service Centre (CSC) with your Aadhaar and land records.",
  },
  {
    id: "crop-insurance",
    name: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)",
    description:
      "Insurance cover for crop loss due to natural calamities, pests, or disease at low premium rates.",
    eligibility: (user) => user.incomeType === "farmer",
    applyHint:
      "Apply through your bank, CSC, or insurance company before the crop season cut-off date.",
  },
  {
    id: "disability-pension",
    name: "Indira Gandhi National Disability Pension Scheme",
    description:
      "Monthly pension support for persons with 80%+ disability from BPL households.",
    eligibility: (user) => user.accessibility?.length > 0,
    applyHint:
      "Apply at your local Gram Panchayat or Social Welfare Department with a disability certificate.",
  },
  {
    id: "pmjjby",
    name: "PM Jeevan Jyoti Bima Yojana",
    description:
      "Life insurance cover of ₹2 lakh for just ₹436/year, for ages 18-50.",
    eligibility: () => true,
    applyHint:
      "Ask your bank to link this to your savings account — most banks offer auto-enrollment.",
  },
  {
    id: "pmsby",
    name: "PM Suraksha Bima Yojana",
    description:
      "Accident insurance cover of ₹2 lakh for just ₹20/year, for ages 18-70.",
    eligibility: () => true,
    applyHint:
      "Available through almost any bank — ask your branch to enable it on your account.",
  },
  {
    id: "mudra-loan",
    name: "PM MUDRA Yojana",
    description:
      "Collateral-free loans up to ₹10 lakh for small businesses and self-employed individuals.",
    eligibility: (user) =>
      user.incomeType === "gig" || user.incomeType === "other",
    applyHint:
      "Apply at any nationalized bank, RRB, or NBFC with your business plan and ID proof.",
  },
  {
    id: "nsap",
    name: "National Social Assistance Programme (NSAP)",
    description:
      "Pension support for elderly, widowed, or disabled persons from BPL households.",
    eligibility: (user) =>
      user.accessibility?.length > 0 || Number(user.monthlyIncome) < 8000,
    applyHint: "Apply through your local Gram Panchayat or Municipal office.",
  },
];

export function getMatchedSchemes(user) {
  return SCHEMES.filter((scheme) => scheme.eligibility(user));
}
