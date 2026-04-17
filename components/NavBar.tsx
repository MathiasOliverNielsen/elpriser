import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "OVERSIGT" },
  { href: "/priccurrentes", label: "LIGE NU" },
  { href: "/history", label: "HISTORIK" },
  { href: "/settings", label: "INDSTILLINGER" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
