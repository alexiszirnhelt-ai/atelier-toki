<div align="center">
  <h1>L'Atelier Toki 🏺</h1>
  <p><em>Site e-commerce fictif d'un atelier de poterie artisanale</em></p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white" alt="SQLite" />
    <img src="https://img.shields.io/badge/Stripe-Test_mode-635BFF?logo=stripe&logoColor=white" alt="Stripe" />
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

## Aperçu

| Boutique                                        | Détail produit                                | Paiement                                             |
| ----------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| ![Boutique](docs/screenshots/boutique-toki.png) | ![Produit](docs/screenshots/produit-toki.png) | ![Checkout Stripe](docs/screenshots/stripe-toki.png) |

| Atelier                                       | Panier                                      | Confirmation                                               |
| --------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| ![Atelier](docs/screenshots/atelier-toki.png) | ![Panier](docs/screenshots/panier-toki.png) | ![Confirmation](docs/screenshots/commande-valide-toki.png) |

## Fonctionnalités

- **Catalogue dynamique** — les 3 produits sont chargés depuis l'API et persistés en base.
- **Panier global** — gestion via React Context, persistance dans le `localStorage` (le panier survit aux rechargements).
- **Tunnel d'achat complet** — formulaire client en deux étapes, Stripe Elements intégré, redirection après paiement.
- **Paiement Stripe** — création de PaymentIntent, confirmation côté client, webhook backend pour valider la commande.
- **Webhook sécurisé** — vérification de signature, idempotence, transaction atomique pour la mise à jour du stock.
- **Formulaire de contact** — validation client + serveur, persistance des messages en base.
- **Pages éditoriales** — accueil, atelier (philosophie, processus), stages & cours, contact.
- **Notifications toast** — système maison via Context (succès, erreur, info).
- **Design system cohérent** — palette « sumi & sable » inspirée du wabi-sabi, typographies Google Fonts (Shippori Mincho, Inter, Noto Serif JP).
- **Responsive** — mobile, tablette, desktop.
- **Accessibilité** — labels associés, ARIA, navigation au clavier.

## Stack technique

### Frontend

- **React 19** + **Vite 5**
- **React Router 6** pour le routing (dont routes dynamiques)
- **Tailwind CSS 3** avec configuration personnalisée
- **Stripe Elements** (`@stripe/react-stripe-js`)
- **Context API** pour les états globaux (panier, toasts)

### Backend

- **Node.js** + **Express 4**
- **Prisma 5** comme ORM
- **SQLite** en développement (migration PostgreSQL prévue)
- **Stripe SDK** pour les paiements et webhooks
- Architecture en couches : `routes/` → `controllers/` → `lib/`

### Outils

- **Git** + **GitHub** avec workflow par branches et Pull Requests
- **VS Code**
- **Stripe CLI** pour le test des webhooks en local

## Architecture

```
atelier-toki/
├── frontend/                    # React + Vite
│   └── src/
│       ├── components/          # Header, Footer, Layout, ProductCard, Toaster, PaymentForm
│       ├── pages/               # Home, Atelier, Boutique, Produit, Stages, Contact, Panier, Checkout, Confirmation
│       ├── context/             # CartContext, ToastContext
│       ├── services/            # api.js (fetch wrappers)
│       └── lib/                 # stripe.js
├── backend/                     # Node.js + Express
│   └── src/
│       ├── controllers/         # productsController, contactController, ordersController, webhookController
│       ├── routes/              # products, contact, orders, webhooks
│       └── lib/                 # prisma, stripe
├── prisma/
│   ├── schema.prisma            # Models : Product, Workshop, Order, OrderItem, ContactMessage
│   └── migrations/
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

## Installation

### Prérequis

- **Node.js** 18+
- **npm** ou pnpm
- Un compte **Stripe** (gratuit, mode test)
- **Stripe CLI** ([installation](https://docs.stripe.com/stripe-cli)) pour tester les webhooks en local

### Étapes

1. **Cloner le projet**

```bash
git clone https://github.com/alexiszirnhelt-ai/atelier-toki.git
cd atelier-toki
```

2. **Installer le backend**

```bash
cd backend
npm install
```

Créer le fichier `backend/.env` à partir de `backend/.env.example` :

```
DATABASE_URL="file:./dev.db"
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
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

3. **Installer le frontend** (dans un autre terminal)

```bash
cd frontend
npm install
```

Créer le fichier `frontend/.env` à partir de `frontend/.env.example` :

```
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

Lancer le frontend :

```bash
npm run dev
```

4. **Lancer le forwarding des webhooks Stripe** (dans un troisième terminal)

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Copier le `whsec_...` affiché et le coller dans `backend/.env` (`STRIPE_WEBHOOK_SECRET`), puis redémarrer le backend.

5. **Ouvrir le site**

[http://localhost:5173](http://localhost:5173)

### Tester un paiement

Sur la page de paiement, utiliser une carte de test Stripe :

| Carte                 | Comportement                       |
| --------------------- | ---------------------------------- |
| `4242 4242 4242 4242` | Paiement validé                    |
| `4000 0000 0000 0002` | Carte refusée                      |
| `4000 0027 6000 3184` | Authentification 3D Secure requise |

N'importe quelle date future, n'importe quel CVC, n'importe quel code postal.

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

- Architecture full-stack JavaScript (React + Express + Prisma)
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
- Workflow Git professionnel (branches, PR, conventional commits)
- Design responsive avec Tailwind CSS
- Accessibilité (ARIA, labels, contrastes)

## Limites et pistes d'amélioration

- Pas encore de tests automatisés (Vitest envisagé)
- Pas d'interface admin (saisie via Prisma Studio uniquement)
- SQLite à remplacer par PostgreSQL pour le déploiement
- Pas encore de TypeScript (migration prévue)
- Pas d'envoi réel d'emails de confirmation (Stripe gère le reçu de paiement uniquement)

## Crédits

- **Photos** : [Unsplash](https://unsplash.com)
- **Caractères japonais** : éléments de calligraphie 時 (toki, l'instant), 手 (te, la main), 文 (bun, le message), 心 (kokoro, le cœur), 謝 (sha, la gratitude), 空 (kuu, le vide), 器 (ki, le récipient), 侘 (wabi), 間 (ma), 物 (mono)
- **Polices** : [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho), [Inter](https://fonts.google.com/specimen/Inter), [Noto Serif JP](https://fonts.google.com/specimen/Noto+Serif+JP) — Google Fonts
- **Paiement** : [Stripe](https://stripe.com)

## Auteur

**Alexis-Lexart Studio** — projet personnel d'apprentissage full-stack

---

<p align="center">
  <em>« Une poterie, c'est un geste qu'on fige. »</em>
</p>
