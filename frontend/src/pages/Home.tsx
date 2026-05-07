import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=2000&q=80"
          alt="Mains façonnant de l'argile sur un tour de potier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Voile sombre pour lisibilité */}
        <div className="absolute inset-0 bg-ink/40"></div>

        {/* Texte centré */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <span className="font-jp text-5xl text-paper/90 mb-6">時</span>
          <h1 className="font-serif text-5xl md:text-7xl text-paper mb-6 max-w-3xl leading-tight">
            L'instant suspendu, façonné à la main
          </h1>
          <p className="text-lg md:text-xl text-paper/80 max-w-xl mb-10 leading-relaxed">
            Une poterie, c'est un geste qu'on fige. Bienvenue dans l'atelier où
            le temps prend forme.
          </p>
          <Link
            to="/boutique"
            className="px-8 py-3 border border-paper text-paper text-sm uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors"
          >
            Découvrir les créations
          </Link>
        </div>
      </section>

      {/* SECTION : L'ATELIER (teaser) */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              L'Atelier
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4 mb-6 leading-tight">
              Là où la terre devient mémoire
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Niché au cœur de Nancy, L'Atelier Toki est un lieu de patience.
              Chaque pièce y naît d'un dialogue entre la main, la terre, le feu.
            </p>
            <p className="text-ink-soft leading-relaxed mb-8">
              Inspirée de la philosophie du wabi-sabi, notre démarche célèbre
              l'imperfection, le passage du temps, l'unicité de chaque geste.
            </p>
            <Link
              to="/atelier"
              className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
            >
              Visiter l'atelier
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier de poterie avec étagères et créations"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION : NOS CRÉATIONS */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              Nos créations
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4">
              Trois pièces, trois instants
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte 1 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1733459187464-29d0289750b1?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bol en grès émaillé"
                  className="w-full h-full object-cover object-[center_80%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl text-ink mb-1">
                Bol en grès émaillé
              </h3>
              <p className="text-sm text-ink-soft">35 €</p>
            </div>

            {/* Carte 2 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1649669637614-511a3931b11a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Vase ondulé en porcelaine"
                  className="w-full h-full object-cover object-[center_90%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl text-ink mb-1">
                Vase ondulé en porcelaine
              </h3>
              <p className="text-sm text-ink-soft">78 €</p>
            </div>

            {/* Carte 3 */}
            <div className="group">
              <div className="aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1766747021051-b2d2e8610883?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Mug Soleil levant"
                  className="w-full h-full object-cover object-[center_90%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl text-ink mb-1">
                Mug "Soleil levant"
              </h3>
              <p className="text-sm text-ink-soft">22 €</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/boutique"
              className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
            >
              Voir toute la boutique
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION : STAGES */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Stages & Cours
          </span>
          <h2 className="font-serif text-4xl text-ink mt-4 mb-6 leading-tight">
            Mettez les mains dans la terre
          </h2>
          <p className="text-ink-soft leading-relaxed mb-10">
            Initiation au tour, modelage, émaillage… Venez vivre l'expérience de
            la poterie le temps d'une demi-journée ou d'un week-end immersif.
          </p>
          <Link
            to="/stages"
            className="px-8 py-3 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors inline-block"
          >
            Découvrir les stages
          </Link>
        </div>
      </section>

      {/* SECTION : CONTACT */}
      <section className="bg-sand py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-ink mb-4">
            Une commande sur mesure ?
          </h2>
          <p className="text-ink-soft leading-relaxed mb-8">
            Pour toute demande personnalisée ou simplement pour échanger autour
            d'un projet, écrivez-nous. Nous prenons le temps de répondre.
          </p>
          <Link
            to="/contact"
            className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
          >
            Nous écrire
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
