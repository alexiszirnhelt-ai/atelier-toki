<div align="center">
  <h1>L'Atelier Toki 🏺</h1>
  <p><em>Site e-commerce fictif d'un atelier de poterie artisanale</em></p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Stripe-Test_mode-635BFF?logo=stripe&logoColor=white" alt="Stripe" />
  </p>
  <p>
    <a href="https://atelier-toki.vercel.app"><strong>🌍 Visiter le site en ligne</strong></a>
  </p>
</div>

<p align="center">
  <img src="docs/screenshots/accueil-toki.png" alt="Aperçu de la page d'accueil" width="800" />
</p>

---

## À propos

**L'Atelier Toki** est un site e-commerce fictif réalisé dans un cadre d'apprentissage personnel. Le projet propose le site complet d'un atelier de poterie imaginaire : présentation, boutique, stages, contact, et un tunnel d'achat fonctionnel avec **paiement Stripe** en mode test.

L'identité visuelle s'inspire du **wabi-sabi** japonais : épure, espace, typographie soignée, palette terreuse. Le mot _toki_ (時) signifie « l'instant » en japonais.

> ⚠️ **Site fictif** — aucune commande réelle n'est traitée. Le paiement utilise Stripe en mode test.

## 🌍 Démo en ligne

| Service           | URL                                          |
| ----------------- | -------------------------------------------- |
| **Frontend**      | https://atelier-toki.vercel.app              |
| **Backend (API)** | https://atelier-toki.onrender.com            |
| **Health check**  | https://atelier-toki.onrender.com/api/health |

> 💡 **Premier chargement lent (~50s) ?** C'est normal. Le backend est sur le plan gratuit Render, qui s'endort après 15 minutes d'inactivité. Une fois réveillé, l'app est rapide. C'est un trade-off conscient pour un projet portfolio sans coût d'hébergement.

### 🧪 Tester un achat

Sur la page de paiement, utilisez une **carte de test Stripe** :

| Carte                 | Comportement                          |
| --------------------- | ------------------------------------- |
| `4242 4242 4242 4242` | ✅ Paiement validé                    |
| `4000 0000 0000 0002` | ❌ Carte refusée                      |
| `4000 0027 6000 3184` | 🔐 Authentification 3D Secure requise |

Pour les trois : n'importe quelle date d'expiration future, n'importe quel CVC, n'importe quel code postal.

## Aperçu

| Boutique                                        | Détail produit                                | Paiement                                             |
| ----------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| ![Boutique](docs/screenshots/boutique-toki.png) | ![Produit](docs/screenshots/produit-toki.png) | ![Checkout Stripe](docs/screenshots/stripe-toki.png) |

| Atelier                                       | Panier                                      | Confirmation                                               |
| --------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| ![Atelier](docs/screenshots/atelier-toki.png) | ![Panier](docs/screenshots/panier-toki.png) | ![Confirmation](docs/screenshots/commande-valide-toki.png) |

## Fonctionnalités

- **Catalogue dynamique** — les 3 produits sont chargés depuis l'API et persistés en base
- **Panier global** — gestion via React Context, persistance dans le `localStorage`
- **Tunnel d'achat complet** — formulaire client en deux étapes, Stripe Elements intégré
- **Paiement Stripe** — création de PaymentIntent, confirmation côté client, webhook backend
- **Webhook sécurisé** — vérification de signature, idempotence, transaction atomique pour la mise à jour du stock
- **Formulaire de contact** — validation client + serveur, persistance en base
- **Pages éditoriales** — accueil, atelier (philosophie, processus), stages & cours, contact
- **Notifications toast** — système maison via Context (succès, erreur, info)
- **Design system cohérent** — palette « sumi & sable » inspirée du wabi-sabi
- **Typographies Google Fonts** — Shippori Mincho, Inter, Noto Serif JP
- **Responsive complet** — menu burger sur mobile, layouts adaptés
- **TypeScript strict mode** — types partagés frontend/backend, validation à la compilation
- **Accessibilité** — labels associés, ARIA, navigation au clavier

## Architecture en production

```
┌──────────────────────┐    HTTPS     ┌──────────────────────┐
│       FRONTEND       │ ─GET/POST──> │       BACKEND        │
│        Vercel        │              │        Render        │
│     atelier-toki     │ <───JSON──── │     atelier-toki     │
│     .vercel.app      │              │    .onrender.com     │
└──────────────────────┘              └──────────┬───────────┘
                                                 │
                                      ┌──────────▼───────────┐
                                      │      POSTGRESQL      │
                                      │   Neon (Frankfurt)   │
                                      └──────────────────────┘
                                                 ▲
                                                 │ webhooks
                                      ┌──────────┴───────────┐
                                      │        STRIPE        │
                                      │     (mode test)      │
                                      └──────────────────────┘
```

| Composant                  | Hébergeur | Plan                           |
| -------------------------- | --------- | ------------------------------ |
| Frontend (Vite + React)    | Vercel    | Hobby (gratuit)                |
| Backend (Express + Prisma) | Render    | Free (cold start après 15 min) |
| Base de données            | Neon      | Free (pérenne)                 |
| Paiement                   | Stripe    | Test mode                      |

## Stack technique

### Frontend

- **React 19** + **Vite 5** + **TypeScript** (strict mode)
- **React Router 6** pour le routing (dont routes dynamiques)
- **Tailwind CSS 3** avec configuration personnalisée
- **Stripe Elements** (`@stripe/react-stripe-js`)
- **Context API** pour les états globaux (panier, toasts)

### Backend

- **Node.js** + **Express 4** + **TypeScript** (strict mode)
- **Prisma 7** avec adaptateur `@prisma/adapter-pg`
- **PostgreSQL** en production (Neon), SQLite supporté historiquement
- **Stripe SDK** pour les paiements et webhooks
- Architecture en couches : `routes/` → `controllers/` → `lib/`

### Outils

- **Git** + **GitHub** avec workflow par branches et Pull Requests
- **VS Code**
- **Stripe CLI** pour le test des webhooks en local

## Structure du projet

```
atelier-toki/
├── frontend/                  # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/        # Header, Footer, Layout, ProductCard, Toaster, PaymentForm
│   │   ├── pages/             # Home, Atelier, Boutique, Produit, Stages, Contact, Panier, Checkout, Confirmation
│   │   ├── context/           # CartContext, ToastContext
│   │   ├── services/          # api.ts (fetch wrappers)
│   │   ├── lib/               # stripe.ts
│   │   └── types.ts           # Types partagés (Product, Order, etc.)
│   └── vercel.json            # Routing SPA pour React Router
├── backend/                   # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/       # productsController, contactController, ordersController, webhookController
│   │   ├── routes/            # products, contact, orders, webhooks
│   │   └── lib/               # prisma, stripe
│   ├── prisma/
│   │   ├── schema.prisma      # Models : Product, Workshop, Order, OrderItem, ContactMessage
│   │   └── migrations/
│   └── prisma.config.ts
└── docs/
└── screenshots/
```

### Flux de paiement

1. Frontend → POST /api/orders avec items + infos client
2. Backend valide, crée la commande (status: pending) + PaymentIntent Stripe
3. Backend renvoie { orderId, clientSecret }
4. Frontend affiche Stripe Elements, l'utilisateur saisit sa carte
5. Stripe valide le paiement et redirige vers /commande/:id
6. Stripe envoie un webhook → Backend marque la commande "paid" + décrémente le stock

## Installation en local

### Prérequis

- **Node.js** 18+
- **npm**
- Un compte **Stripe** (gratuit, mode test)
- **Stripe CLI** ([installation](https://docs.stripe.com/stripe-cli)) pour tester les webhooks en local
- Une base **PostgreSQL** locale ou un compte **Neon** (gratuit)

### 1. Cloner le projet

```bash
git clone https://github.com/<votre-pseudo>/atelier-toki.git
cd atelier-toki
```

### 2. Backend

```bash
cd backend
npm install
```

Créer le fichier `backend/.env` à partir de `backend/.env.example` :

```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CORS_ORIGIN=http://localhost:5173
```

Initialiser la base et la peupler :

```bash
npx prisma migrate dev
npx prisma db seed
```

Lancer le serveur :

```bash
npm run dev
```

### 3. Frontend (dans un autre terminal)

```bash
cd frontend
npm install
```

Créer le fichier `frontend/.env` à partir de `frontend/.env.example` :

```bash
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

Lancer le frontend :

```bash
npm run dev
```

### 4. Stripe CLI (dans un troisième terminal)

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Copier le `whsec_...` affiché et le coller dans `backend/.env` (`STRIPE_WEBHOOK_SECRET`), puis redémarrer le backend.

### 5. Ouvrir le site

[http://localhost:5173](http://localhost:5173)

## Workflow Git

Le projet suit un workflow par branches :

- `main` représente la version stable (jamais de commit direct)
- Une branche par fonctionnalité, nommée selon la convention :
  - `feat/...` pour une nouvelle fonctionnalité
  - `fix/...` pour un correctif
  - `chore/...` pour de la configuration ou maintenance
  - `docs/...` pour la documentation
  - `refactor/...` pour du refactoring sans changement de comportement
- Chaque branche est mergée via une **Pull Request** sur GitHub, puis supprimée

Les messages de commit suivent la convention **Conventional Commits** : `type: description courte`.

## Apprentissages

Ce projet m'a permis d'aborder concrètement :

- Architecture full-stack JavaScript/TypeScript (React + Express + Prisma)
- Communication frontend/backend via API REST (GET, POST)
- Gestion d'état local (`useState`) et global (Context API)
- Effets de bord et cycle de vie (`useEffect`)
- Routes dynamiques côté client (`useParams`)
- Persistance dans `localStorage`
- Modélisation relationnelle et migrations Prisma
- Transactions atomiques (`prisma.$transaction`)
- Validation client + serveur
- Intégration d'un fournisseur de paiement (Stripe)
- Webhooks et vérification de signature
- Variables d'environnement et secrets
- Migration JavaScript → TypeScript en mode strict
- Migration SQLite → PostgreSQL
- **Déploiement multi-services** : Vercel (front), Render (back), Neon (DB)
- Configuration CORS multi-origines
- Workflow Git professionnel (branches, PR, conventional commits)
- Design responsive avec Tailwind CSS
- Accessibilité (ARIA, labels, contrastes)

## Limites et pistes d'amélioration

- Pas encore de tests automatisés (Vitest envisagé)
- Pas d'interface admin (saisie via Prisma Studio uniquement)
- Pas d'envoi réel d'emails de confirmation (Stripe gère le reçu de paiement)
- `req.body` typé en `any` côté backend (à raffiner avec Zod)
- Cold start de Render à mitiger avec un ping périodique (UptimeRobot)

## Crédits

- **Photos** : [Unsplash](https://unsplash.com)
- **Caractères japonais** : 時 (toki, l'instant), 手 (te, la main), 文 (bun, le message), 心 (kokoro, le cœur), 謝 (sha, la gratitude), 空 (kuu, le vide), 器 (ki, le récipient), 侘 (wabi), 間 (ma), 物 (mono)
- **Polices** : [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho), [Inter](https://fonts.google.com/specimen/Inter), [Noto Serif JP](https://fonts.google.com/specimen/Noto+Serif+JP) — Google Fonts
- **Paiement** : [Stripe](https://stripe.com)
- **Hébergement** : [Vercel](https://vercel.com), [Render](https://render.com), [Neon](https://neon.tech)

## Auteur

**Alexis** — projet personnel d'apprentissage full-stack

[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white)](https://github.com/alexiszirnhelt-ai)

---

<p align="center">
  <em>« Une poterie, c'est un geste qu'on fige. »</em>
</p>
