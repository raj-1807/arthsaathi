import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  MessageCircle,
  Wallet,
  ShieldAlert,
  GraduationCap,
  Landmark,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    to: "/chat",
    label: "Ask SaathiBot",
    icon: MessageCircle,
    color: "bg-blue-50 text-blue-600",
  },
  {
    to: "/budget",
    label: "Plan my Budget",
    icon: Wallet,
    color: "bg-amber-50 text-amber-600",
  },
  {
    to: "/learn",
    label: "Learn & Earn Points",
    icon: GraduationCap,
    color: "bg-purple-50 text-purple-600",
  },
];

function scoreColor(score) {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const score = user.financialHealthScore ?? 50;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-1">
        Namaste, {user.name} 👋
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Here's your financial overview
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Financial Health Score</p>
          <p className={`text-4xl font-bold ${scoreColor(score)}`}>
            {score}
            <span className="text-lg text-gray-400">/100</span>
          </p>
        </div>
        <div className="w-24 h-24 rounded-full border-8 border-gray-100 flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#059669 ${score * 3.6}deg, #e5e7eb 0deg)`,
              mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))",
            }}
          />
          <Landmark className="text-emerald-600" size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {QUICK_ACTIONS.map(({ to, label, icon: Icon, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition flex flex-col gap-2"
          >
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
            >
              <Icon size={18} />
            </span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="text-amber-600 shrink-0" size={20} />
        <div>
          <p className="text-sm font-medium text-amber-800">Stay alert</p>
          <p className="text-sm text-amber-700">
            Never share OTPs or bank PINs with anyone, even if they claim to be
            from your bank.
          </p>
        </div>
      </div>
    </div>
  );
}
