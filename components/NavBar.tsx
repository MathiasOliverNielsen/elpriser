"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "OVERSIGT" },
  { href: "/current", label: "LIGE NU" },
  { href: "/history", label: "HISTORIK" },
  { href: "/settings", label: "INDSTILLINGER" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <Image src="/img/mainicon.svg" alt="Elpriser.nu logo" width={32} height={32} />
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
