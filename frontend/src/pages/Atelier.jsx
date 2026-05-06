import { Link } from "react-router-dom";

function Atelier() {
  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-jp text-4xl text-ink-soft block mb-6">時</span>
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            L'Atelier
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mt-4 leading-tight">
            Là où la terre
            <br />
            devient mémoire
          </h1>
        </div>
      </section>

      {/* L'HISTOIRE */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1632819506620-cc0f984af43a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mains d'une potière travaillant l'argile"
              className="w-full h-full object-cover object-[28%_center]"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              L'histoire
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4 mb-8 leading-tight">
              Une histoire de patience
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              L'Atelier Toki est né en 2018 d'un voyage au Japon, dans la région
              de Mashiko, célèbre pour ses traditions céramiques.
            </p>
            <p className="text-ink-soft leading-relaxed mb-4">
              De retour en Lorraine, Camille a installé son tour dans une
              ancienne menuiserie au cœur de Nancy. Aujourd'hui, l'atelier est
              un lieu vivant où se côtoient les pièces en cours de séchage, les
              bocaux d'émaux, et les apprentis du week-end.
            </p>
            <p className="text-ink-soft leading-relaxed">
              Chaque création y est unique : pas deux bols identiques, pas deux
              gestes répétés.
            </p>
          </div>
        </div>
      </section>

      {/* LA PHILOSOPHIE — 3 piliers */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              Notre philosophie
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4">
              Trois principes, un même geste
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Pilier 1 : Wabi-Sabi */}
            <div className="text-center">
              <span className="font-jp text-4xl text-clay block mb-6">侘</span>
              <h3 className="font-serif text-2xl text-ink mb-4">Wabi-Sabi</h3>
              <p className="text-ink-soft leading-relaxed">
                La beauté de l'imparfait. Une fissure, une asymétrie, une trace
                de doigt : ce qui rend chaque pièce vivante.
              </p>
            </div>

            {/* Pilier 2 : Ma */}
            <div className="text-center">
              <span className="font-jp text-4xl text-clay block mb-6">間</span>
              <h3 className="font-serif text-2xl text-ink mb-4">
                Ma — l'espace
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Le vide qui donne sa forme au plein. Nos pièces sont pensées
                pour habiter votre quotidien sans le saturer.
              </p>
            </div>

            {/* Pilier 3 : Mono no aware */}
            <div className="text-center">
              <span className="font-jp text-4xl text-clay block mb-6">物</span>
              <h3 className="font-serif text-2xl text-ink mb-4">
                Mono no aware
              </h3>
              <p className="text-ink-soft leading-relaxed">
                La conscience de l'éphémère. Une poterie traverse les
                générations, en gardant la mémoire des mains qui l'ont touchée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LE PROCESSUS — 4 étapes */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              Le processus
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4">
              De la terre au feu
            </h2>
          </div>

          <div className="space-y-12">
            {/* Étape 1 */}
            <div className="grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-serif text-5xl text-clay">01</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-xl text-ink">Préparer</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-ink-soft leading-relaxed">
                  L'argile est pétrie longuement pour chasser l'air et
                  homogénéiser sa texture. Cette étape, ingrate, conditionne
                  tout le reste.
                </p>
              </div>
            </div>

            <div className="border-t border-ink/10"></div>

            {/* Étape 2 */}
            <div className="grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-serif text-5xl text-clay">02</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-xl text-ink">Tourner</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-ink-soft leading-relaxed">
                  Au tour, la terre s'élève sous la pression des mains. Le
                  geste, lent et précis, donne naissance à la forme.
                </p>
              </div>
            </div>

            <div className="border-t border-ink/10"></div>

            {/* Étape 3 */}
            <div className="grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-serif text-5xl text-clay">03</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-xl text-ink">Émailler</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-ink-soft leading-relaxed">
                  Après une première cuisson, la pièce reçoit son émail. Les
                  recettes sont élaborées à partir de cendres, d'oxydes minéraux
                  et d'eau.
                </p>
              </div>
            </div>

            <div className="border-t border-ink/10"></div>

            {/* Étape 4 */}
            <div className="grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-serif text-5xl text-clay">04</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-xl text-ink">Cuire</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-ink-soft leading-relaxed">
                  Le four monte à 1280°C pendant douze heures. Au
                  refroidissement, l'émail révèle ses couleurs, parfois
                  inattendues. C'est l'instant du dévoilement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'ESPACE — galerie */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              L'espace
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4">
              Bienvenue dans l'atelier
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1722220543581-79ef38bed8f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Vase japonais"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bol japonais en grès émaillé"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1633107939685-2e7105a8f01d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Téière et tasses"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Vase et bols"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
                alt="Bols émaillés"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1653379557722-02c74bc93f05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Etagère de l'atelier"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="bg-ink py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-jp text-3xl text-paper/70 block mb-6">時</span>
          <h2 className="font-serif text-4xl text-paper mb-6 leading-tight">
            Venez vivre l'atelier
          </h2>
          <p className="text-paper/70 leading-relaxed mb-10">
            Les portes sont ouvertes le temps d'un stage, d'un cours, ou d'une
            simple visite. Le geste se transmet mieux qu'il ne s'explique.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/stages"
              className="px-8 py-3 bg-paper text-ink text-sm uppercase tracking-widest hover:bg-clay hover:text-paper transition-colors"
            >
              Découvrir les stages
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-paper text-paper text-sm uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors"
            >
              Nous écrire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Atelier;
