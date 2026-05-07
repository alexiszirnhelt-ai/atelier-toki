import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/cart-context";

function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/atelier", label: "L'Atelier" },
    { to: "/boutique", label: "Boutique" },
    { to: "/stages", label: "Stages & Cours" },
    { to: "/contact", label: "Contact" },
  ];

  // Fermer le menu avec la touche Échap
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Empêcher le scroll de la page quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="bg-paper border-b border-ink/10 relative z-40">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-baseline gap-2 group">
          <span className="font-jp text-2xl text-ink group-hover:text-clay transition-colors">
            時
          </span>
          <span className="font-serif text-lg lg:text-xl tracking-wider text-ink">
            L'Atelier Toki
          </span>
        </NavLink>

        {/* Navigation desktop (lg+) */}
        <nav className="hidden lg:block">
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

        {/* Actions à droite : panier + burger (mobile + tablette) */}
        <div className="flex items-center gap-4 lg:gap-6">
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

          {/* Bouton burger (mobile + tablette) */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden text-ink hover:text-clay transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              {menuOpen ? (
                // Icône ✕ (croix)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Icône ☰ (burger)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile (slide-down sous le header) */}
      {menuOpen && (
        <>
          {/* Overlay sombre derrière le menu */}
          <div
            className="fixed inset-0 top-[73px] bg-ink/30 z-30 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Le menu */}
          <nav
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-paper border-b border-ink/10 shadow-lg z-40"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li
                  key={link.to}
                  className="border-b border-ink/5 last:border-b-0"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-6 py-4 text-sm uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-ink font-medium bg-sand/30"
                          : "text-ink-soft hover:text-ink hover:bg-sand/20"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
