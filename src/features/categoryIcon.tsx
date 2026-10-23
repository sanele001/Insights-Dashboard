import type { IconType } from "react-icons";
import {
  FaShoppingCart,
  FaFilm,
  FaCar,
  FaUtensils,
  FaShoppingBag,
  FaTint,
  FaBolt,
  FaHome,
  FaHeartbeat,
  FaPlane,
  FaGraduationCap,
  FaBus,
  FaGasPump,
  FaMobileAlt,
  FaWifi,
  FaPaw,
  FaTag,
} from "react-icons/fa";

// Add a line here whenever the API introduces a new icon name.
const ICONS: Record<string, IconType> = {
  "shopping-cart": FaShoppingCart,
  film: FaFilm,
  car: FaCar,
  utensils: FaUtensils,
  "shopping-bag": FaShoppingBag,
  tint: FaTint,
  bolt: FaBolt,
  home: FaHome,
  heartbeat: FaHeartbeat,
  plane: FaPlane,
  "graduation-cap": FaGraduationCap,
  bus: FaBus,
  "gas-pump": FaGasPump,
  "mobile-alt": FaMobileAlt,
  wifi: FaWifi,
  paw: FaPaw,
};

type CategoryIconProps = {
  name: string;
  className?: string;
};

export default function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = ICONS[name] ?? FaTag; // unknown names fall back to a tag icon
  return <Icon aria-hidden className={className} />;
}
