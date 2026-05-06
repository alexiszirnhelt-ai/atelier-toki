import { NavLink } from "react-router-dom";

function Header() {
  // Les liens de navigation, dans un tableau pour éviter la répétition
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/atelier", label: "L'Atelier" },
    { to: "/boutique", label: "Boutique" },
    { to: "/stages", label: "Stages & Cours" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-amber-900 text-amber-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Nom du magasin */}
        <NavLink to="/" className="text-2xl font-bold tracking-wide">
          L'Atelier Toki 🏺
        </NavLink>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-amber-200 font-semibold border-b-2 border-amber-200 pb-1"
                      : "hover:text-amber-200 transition-colors"
                  }
                  end={link.to === "/"}
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
