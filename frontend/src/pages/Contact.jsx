import { useState } from "react";
import { sendContactMessage } from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: null,
      }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Veuillez indiquer votre nom.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Veuillez indiquer votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Cet email ne semble pas valide.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Veuillez préciser un sujet.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est vide.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        "Le message est un peu court (10 caractères minimum).";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validation côté client
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Envoi au serveur
    setSubmitting(true);
    setServerError(null);

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Erreur envoi formulaire:", err);

      if (err.fields) {
        // Erreurs de validation côté serveur
        setErrors(err.fields);
      } else {
        // Erreur réseau ou serveur générique
        setServerError(
          err.message ||
            "Une erreur est survenue. Vérifiez votre connexion et réessayez.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-paper py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-jp text-4xl text-ink-soft block mb-6">文</span>
          <span className="text-xs uppercase tracking-widest text-ink-soft">
            Contact
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mt-4 leading-tight">
            Écrivez-nous
          </h1>
          <p className="text-ink-soft leading-relaxed mt-8 max-w-xl mx-auto">
            Une question, une commande sur mesure, une envie d'atelier ? Nous
            prenons le temps de répondre, généralement sous 48h.
          </p>
        </div>
      </section>

      {/* FORMULAIRE + INFOS */}
      <section className="bg-sand py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* COLONNE GAUCHE : INFOS */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl text-ink mb-6">L'atelier</h2>

            <div className="space-y-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                  Adresse
                </p>
                <p className="text-ink leading-relaxed">
                  12 rue des Potiers
                  <br />
                  54000 Nancy, France
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                  Email
                </p>
                <p className="text-ink">contact@atelier-toki.fr</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                  Téléphone
                </p>
                <p className="text-ink">03 83 00 00 00</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                  Horaires
                </p>
                <p className="text-ink leading-relaxed">
                  Mardi — Samedi
                  <br />
                  10h — 18h
                </p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <div className="md:col-span-2 bg-paper p-8 md:p-12">
            {submitted ? (
              // Message de confirmation
              <div className="text-center py-12">
                <span className="font-jp text-5xl text-clay block mb-6">
                  心
                </span>
                <h2 className="font-serif text-3xl text-ink mb-4">
                  Message bien reçu
                </h2>
                <p className="text-ink-soft leading-relaxed mb-8">
                  Merci de nous avoir écrit. Nous revenons vers vous très
                  bientôt.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm uppercase tracking-widest text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition-colors"
                >
                  Écrire un autre message
                </button>
              </div>
            ) : (
              // Formulaire
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="font-serif text-2xl text-ink mb-8">
                  Votre message
                </h2>

                {/* Erreur serveur globale */}
                {serverError && (
                  <div className="mb-6 p-4 bg-clay/10 border border-clay/30">
                    <p className="text-sm text-clay">{serverError}</p>
                  </div>
                )}

                {/* Nom */}
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 ${
                      errors.name ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-clay text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 ${
                      errors.email ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-clay text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Sujet */}
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors disabled:opacity-50 ${
                      errors.subject ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-clay text-sm mt-2">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-widest text-ink-soft mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 bg-paper border text-ink focus:outline-none focus:border-ink transition-colors resize-none disabled:opacity-50 ${
                      errors.message ? "border-clay" : "border-ink/20"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-clay text-sm mt-2">{errors.message}</p>
                  )}
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-3 bg-ink text-paper text-sm uppercase tracking-widest hover:bg-clay transition-colors disabled:bg-ink-soft disabled:cursor-not-allowed"
                >
                  {submitting ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
