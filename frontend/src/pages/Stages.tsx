import { Link } from "react-router-dom";

function Stages() {
  // Données en dur pour l'instant — on les chargera depuis l'API plus tard
  const stages = [
    {
      id: 1,
      title: "Initiation au tour de potier",
      level: "Débutant",
      description:
        "Une demi-journée pour découvrir le geste du tournage. Vous repartez avec deux pièces qui seront cuites et vernies à l'atelier, à récupérer trois semaines plus tard.",
      date: "15 juin 2026",
      time: "14h — 17h",
      duration: "3 heures",
      price: 65,
      capacity: 6,
      remaining: 3,
    },
    {
      id: 2,
      title: "Stage week-end : du modelage à l'émaillage",
      level: "Tous niveaux",
      description:
        "Deux jours immersifs pour réaliser plusieurs pièces, du façonnage à l'émaillage. Repas du midi inclus, ambiance conviviale. Cuisson finale incluse.",
      date: "4 — 5 juillet 2026",
      time: "10h — 18h",
      duration: "2 jours (16h)",
      price: 220,
      capacity: 8,
      remaining: 5,
    },
    {
      id: 3,
      title: "Cours mensuel — atelier libre",
      level: "Intermédiaire",
      description:
        "Un samedi par mois, un créneau de trois heures où vous travaillez sur vos propres projets, avec mes conseils. Argile et outils fournis, cuisson en supplément.",
      date: "Premier samedi du mois",
      time: "10h — 13h",
      duration: "3 heures / mois",
      price: 45,
      capacity: 4,
      remaining: 2,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-jp text-4xl text-ink-soft block mb-6">手</span>
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Stages & Cours
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mt-4 leading-tight">
            Mettez les mains
            <br />
            dans la terre
          </h1>
          <p className="text-ink-soft leading-relaxed mt-8 max-w-xl mx-auto">
            Trois formules pour découvrir, approfondir, ou pratiquer librement.
            Tout le matériel est fourni, il ne reste qu'à venir.
          </p>
        </div>
      </section>

      {/* LISTE DES STAGES */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {stages.map((stage) => (
            <article
              key={stage.id}
              className="bg-paper p-8 md:p-12 grid md:grid-cols-12 gap-8 items-start"
            >
              {/* Colonne gauche : titre + niveau + description */}
              <div className="md:col-span-7">
                <span className="text-xs uppercase tracking-widest text-clay">
                  {stage.level}
                </span>
                <h2 className="font-serif text-3xl text-ink mt-3 mb-4 leading-tight">
                  {stage.title}
                </h2>
                <p className="text-ink-soft leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Colonne droite : infos pratiques + CTA */}
              <div className="md:col-span-5 md:border-l md:border-ink/10 md:pl-8">
                <dl className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <dt className="text-ink-soft">Date</dt>
                    <dd className="text-ink font-medium">{stage.date}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-ink-soft">Horaires</dt>
                    <dd className="text-ink font-medium">{stage.time}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-ink-soft">Durée</dt>
                    <dd className="text-ink font-medium">{stage.duration}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-ink-soft">Places</dt>
                    <dd className="text-ink font-medium">
                      {stage.remaining} / {stage.capacity} disponibles
                    </dd>
                  </div>
                  <div className="flex justify-between text-base pt-3 border-t border-ink/10">
                    <dt className="text-ink-soft">Tarif</dt>
                    <dd className="font-serif text-2xl text-ink">
                      {stage.price} €
                    </dd>
                  </div>
                </dl>

                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-ink-soft">
              Questions fréquentes
            </span>
            <h2 className="font-serif text-4xl text-ink mt-4">
              Avant de venir
            </h2>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl text-ink mb-3">
                Faut-il avoir déjà fait de la poterie ?
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Non. L'initiation s'adresse aux grands débutants. Le stage
                week-end accueille tous niveaux : chacun progresse à son rythme.
                Le cours mensuel demande quelques bases, on en discute par
                téléphone avant inscription.
              </p>
            </div>

            <div className="border-t border-ink/10"></div>

            <div>
              <h3 className="font-serif text-xl text-ink mb-3">
                Que faut-il apporter ?
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Rien d'autre qu'une tenue salissante. L'argile, les outils, les
                tabliers et les torchons sont fournis. Prévoyez quand même de
                quoi vous laver les mains (l'argile, c'est tenace).
              </p>
            </div>

            <div className="border-t border-ink/10"></div>

            <div>
              <h3 className="font-serif text-xl text-ink mb-3">
                Quand récupérer mes pièces ?
              </h3>
              <p className="text-ink-soft leading-relaxed">
                La cuisson prend du temps. Comptez environ trois semaines après
                le stage pour récupérer vos créations cuites et émaillées, soit
                à l'atelier soit par envoi postal (en supplément).
              </p>
            </div>

            <div className="border-t border-ink/10"></div>

            <div>
              <h3 className="font-serif text-xl text-ink mb-3">
                Et en cas d'annulation ?
              </h3>
              <p className="text-ink-soft leading-relaxed">
                Annulation gratuite jusqu'à 7 jours avant le stage. Au-delà,
                l'acompte de 30% est conservé, sauf cas de force majeure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-paper mb-6 leading-tight">
            Une question, une demande sur mesure ?
          </h2>
          <p className="text-paper/70 leading-relaxed mb-10">
            Stages privés, ateliers d'équipe, anniversaires créatifs… Tout se
            discute. Écrivez-nous, nous prenons le temps de répondre.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 border border-paper text-paper text-sm uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}

export default Stages;
