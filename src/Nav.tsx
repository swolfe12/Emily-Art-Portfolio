
import { useState } from "react";

type NavItem = { label: string; href: string };

type NavProps = {
  brandTitle?: string;
  brandSubtitle?: string;
  leftBlurbLines?: string[];   // e.g., ["RESULTS DRIVEN", "ADVERTISING & SOCIAL", "MEDIA MARKETING"]
  rightBlurbLines?: string[];  // e.g., ["EST. 2019", "LOS ANGELES", "CALIFORNIA"]
  items?: NavItem[];
  cartCount?: number;
  onCartClick?: () => void;
};

const DEFAULT_ITEMS: NavItem[] = [
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT US", href: "/about" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/contact" },
];

export default function Nav({
  brandTitle = "Emily Wolfe",
  brandSubtitle = "Art Portfolio",
  leftBlurbLines = ["RESULTS DRIVEN", "ADVERTISING & SOCIAL", "MEDIA MARKETING"],
  rightBlurbLines = ["EST. 2001", "DALAS,", "TEXAS"],
  items = DEFAULT_ITEMS,
  cartCount = 0,
  onCartClick,
}: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-root">

      {/* Top bar */}
      <nav className="topbar" aria-label="Primary">
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>

        <ul className={`menu ${open ? "menu-open" : ""}`}>
          {items.map((it) => (
            <li key={it.href} className="menu-item">
              <a href={it.href}>{it.label}</a>
            </li>
          ))}
        </ul>

        
      </nav>

      {/* Divider line between bars */}
      <div className="rule" />

      {/* Brand band */}
      <div className="brand-band" role="region" aria-label="Brand overview">
        <div className="band-col band-left">
          {leftBlurbLines.map((line, i) => (
            <div key={i} className="blurb-line">{line}</div>
          ))}
        </div>

        <div className="band-col band-center">
          <div className="brand-title">{brandTitle}</div>
          <div className="brand-subtitle">{brandSubtitle}</div>
        </div>

        <div className="band-col band-right">
          {rightBlurbLines.map((line, i) => (
            <div key={i} className="blurb-line">{line}</div>
          ))}
        </div>
      </div>

      <div className="rule" />
    </header>
  );
}


