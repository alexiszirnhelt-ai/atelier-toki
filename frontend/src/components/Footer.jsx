function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 : à propos */}
          <div>
            <h3 className="text-amber-200 font-bold mb-3">L'Atelier Toki</h3>
            <p className="text-sm">
              Atelier de poterie artisanale. Créations uniques façonnées à la
              main.
            </p>
          </div>

          {/* Colonne 2 : contact */}
          <div>
            <h3 className="text-amber-200 font-bold mb-3">Nous trouver</h3>
            <p className="text-sm">12 rue des Potiers</p>
            <p className="text-sm">54000 Nancy, France</p>
            <p className="text-sm mt-2">contact@atelier-toki.fr</p>
          </div>

          {/* Colonne 3 : horaires */}
          <div>
            <h3 className="text-amber-200 font-bold mb-3">Horaires</h3>
            <p className="text-sm">Mardi - Samedi : 10h - 18h</p>
            <p className="text-sm">Dimanche - Lundi : Fermé</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-700 mt-8 pt-4 text-center text-sm">
          © {currentYear} L'Atelier Toki — Site fictif réalisé à des fins
          d'apprentissage.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
