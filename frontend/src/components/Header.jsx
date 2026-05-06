import { NavLink } from "react-router-dom";

function Header() {
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/atelier", label: "L'Atelier" },
    { to: "/boutique", label: "Boutique" },
    { to: "/stages", label: "Stages & Cours" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-paper border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo / Nom du magasin */}
        <NavLink to="/" className="flex items-baseline gap-2 group">
          <span className="font-jp text-2xl text-ink group-hover:text-clay transition-colors">
            時
          </span>
          <span className="font-serif text-xl tracking-wider text-ink">
            L'Atelier Toki
          </span>
        </NavLink>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-ink font-medium"
                        : "text-ink-soft hover:text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
