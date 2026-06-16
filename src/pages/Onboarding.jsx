import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LANGUAGES = ["English", "Hindi", "Marathi", "Kannada"];
const INCOME_TYPES = [
  { id: "salaried", label: "Salaried (fixed monthly)" },
  { id: "gig", label: "Gig Worker (daily/weekly)" },
  { id: "farmer", label: "Farmer (seasonal)" },
  { id: "other", label: "Other / Irregular" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    language: "English",
    incomeType: "",
    monthlyIncome: "",
    accessibility: [],
  });

  const toggleAccessibility = (option) => {
    setForm((prev) => ({
      ...prev,
      accessibility: prev.accessibility.includes(option)
        ? prev.accessibility.filter((a) => a !== option)
        : [...prev.accessibility, option],
    }));
  };

  const handleFinish = () => {
    setUser({
      ...form,
      financialHealthScore: 50,
      createdAt: new Date().toISOString(),
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-emerald-700 mb-1">ArthSaathi</h1>
        <p className="text-sm text-gray-500 mb-6">
          Your financial companion · Step {step} of 3
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Priya"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setForm({ ...form, language: lang })}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      form.language === lang
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <button
              disabled={!form.name}
              onClick={() => setStep(2)}
              className="w-full bg-emerald-600 text-white rounded-lg py-2 font-medium disabled:opacity-40 mt-2"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you earn?
              </label>
              <div className="space-y-2">
                {INCOME_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setForm({ ...form, incomeType: type.id })}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                      form.incomeType === type.id
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approx. Monthly Income (₹)
              </label>
              <input
                type="number"
                value={form.monthlyIncome}
                onChange={(e) =>
                  setForm({ ...form, monthlyIncome: e.target.value })
                }
                placeholder="e.g. 15000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700"
              >
                Back
              </button>
              <button
                disabled={!form.incomeType || !form.monthlyIncome}
                onClick={() => setStep(3)}
                className="flex-1 bg-emerald-600 text-white rounded-lg py-2 font-medium disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accessibility needs (optional)
              </label>
              <div className="space-y-2">
                {[
                  "Visual impairment (screen reader)",
                  "Hearing impairment",
                  "Low literacy (voice preferred)",
                ].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={form.accessibility.includes(opt)}
                      onChange={() => toggleAccessibility(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-emerald-600 text-white rounded-lg py-2 font-medium"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
