import { useState } from "react";
import { useUser } from "../context/UserContext";
import { calculateBudget, healthScoreFromBudget } from "../engine/router";
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const EXPENSE_CATEGORIES = [
  { key: "food", label: "Food & Groceries" },
  { key: "rent", label: "Rent / Housing" },
  { key: "transport", label: "Transport" },
  { key: "health", label: "Health & Medical" },
  { key: "education", label: "Education" },
  { key: "other", label: "Other" },
];

const PLAN_STYLES = {
  deficit: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
  },
  conservative: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: TrendingDown,
  },
  balanced: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: Wallet,
  },
  accelerated: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: TrendingUp,
  },
};

export default function Budget() {
  const { user, setUser } = useUser();
  const [expenses, setExpenses] = useState({
    food: "",
    rent: "",
    transport: "",
    health: "",
    education: "",
    other: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (key, value) => {
    setExpenses((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    const budget = calculateBudget({
      monthlyIncome: user.monthlyIncome,
      incomeType: user.incomeType,
      expenses,
    });
    setResult(budget);
    const newScore = healthScoreFromBudget(budget);
    setUser({ ...user, financialHealthScore: newScore });
  };

  const style = result ? PLAN_STYLES[result.plan] : null;
  const Icon = style?.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-1">BudgetGuard</h1>
      <p className="text-sm text-gray-500 mb-6">
        Monthly income: ₹{user?.monthlyIncome} ({user?.incomeType})
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Enter your monthly expenses (₹)
        </p>
        <div className="grid grid-cols-2 gap-3">
          {EXPENSE_CATEGORIES.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs text-gray-500 mb-1">
                {label}
              </label>
              <input
                type="number"
                value={expenses[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-emerald-600 text-white rounded-lg py-2 font-medium mt-4"
        >
          Calculate My Budget
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border p-5 ${style.bg} ${style.border}`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon className={style.color} size={20} />
            <span className={`font-semibold capitalize ${style.color}`}>
              {result.plan} plan
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div>
              <p className="text-gray-500">Total Expenses</p>
              <p className="font-semibold text-gray-800">
                ₹{result.totalExpenses}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Surplus / Deficit</p>
              <p
                className={`font-semibold ${result.surplus >= 0 ? "text-emerald-700" : "text-red-700"}`}
              >
                ₹{result.surplus}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Recommended Savings</p>
              <p className="font-semibold text-gray-800">
                ₹{result.recommendedSavings}/mo
              </p>
            </div>
          </div>
          <p className={`text-sm ${style.color}`}>{result.message}</p>
        </div>
      )}
    </div>
  );
}
