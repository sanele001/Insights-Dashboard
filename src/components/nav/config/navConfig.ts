import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaShieldAlt,
  FaBullseye,
  FaTags,
  FaCog,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type MenuItem = { label: string; href: string; icon: IconType };

export const navigationItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
  { label: "Transactions", href: "/transactions", icon: FaExchangeAlt },
  { label: "Spending Insights", href: "/spending-insights", icon: FaTags },
  { label: "Budgets", href: "/budgets", icon: FaShieldAlt },
  { label: "Goals", href: "/goals", icon: FaBullseye },
  { label: "Categories", href: "/categories", icon: FaTags },
  { label: "Settings", href: "/settings", icon: FaCog },
];
