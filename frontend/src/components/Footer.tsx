function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sand border-t border-ink/10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne 1 : à propos */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-jp text-xl text-ink">時</span>
              <h3 className="font-serif text-lg text-ink">L'Atelier Toki</h3>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              Atelier de poterie artisanale. Chaque pièce est l'instant d'un
              geste, façonné à la main.
            </p>
          </div>

          {/* Colonne 2 : contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-ink-soft mb-4">
              Nous trouver
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              12 rue des Potiers
            </p>
            <p className="text-sm text-ink leading-relaxed">
              54000 Nancy, France
            </p>
            <p className="text-sm text-ink leading-relaxed mt-3">
              contact@atelier-toki.fr
            </p>
          </div>

          {/* Colonne 3 : horaires */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-ink-soft mb-4">
              Horaires
            </h3>
            <p className="text-sm text-ink leading-relaxed">Mardi — Samedi</p>
            <p className="text-sm text-ink leading-relaxed">10h — 18h</p>
            <p className="text-sm text-ink-soft leading-relaxed mt-3">
              Dimanche & Lundi : fermé
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ink/10 mt-12 pt-6 text-center">
          <p className="text-xs text-ink-soft tracking-wide">
            © {currentYear} L'Atelier Toki — Site fictif réalisé à des fins
            d'apprentissage
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
