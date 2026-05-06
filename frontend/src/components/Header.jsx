import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/cart-context";

function Header() {
  const { totalItems } = useCart();

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

        {/* Navigation + panier */}
        <div className="flex items-center gap-8">
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

          {/* Icône panier */}
          <Link
            to="/panier"
            className="relative text-ink hover:text-clay transition-colors"
            aria-label={`Panier (${totalItems} article${totalItems > 1 ? "s" : ""})`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-.002 2.107-.749 2.42-1.829l1.04-3.643a.75.75 0 0 0-.71-.94H6.151"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-clay text-paper text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
