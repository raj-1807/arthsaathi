import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  Wallet,
  GraduationCap,
} from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chat", label: "SaathiBot", icon: MessageCircle },
  { to: "/budget", label: "BudgetGuard", icon: Wallet },
  { to: "/learn", label: "Learn", icon: GraduationCap },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <span className="font-bold text-emerald-700 text-lg">ArthSaathi</span>
      <div className="flex gap-1">
        {LINKS.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600 hover:bg-emerald-50"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
