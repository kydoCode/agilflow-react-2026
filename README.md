# AgilFlow Frontend

Application React moderne avec design glassmorphique pour la gestion de User Stories.

## Stack Technique

- **Framework** : React 18
- **Build** : Vite 7
- **Styling** : TailwindCSS (Glassmorphisme)
- **State** : Zustand
- **Routing** : React Router 7
- **HTTP** : Fetch API

## Installation

```bash
npm install
```

## Configuration

```bash
cp .env.example .env
```

Éditer `.env` :
```env
VITE_API_URL=http://localhost:3000/api
```

## Développement

```bash
npm run dev
```

App disponible sur `http://localhost:5173`

## Build Production

```bash
npm run build
npm run preview
```

## Design System

### Palette Couleurs
- **Gradient** : #020B2D → #123363 → #0D8B7D
- **Primaire** : #0D8B7D (Vert Agile)
- **Secondaire** : #123363 (Bleu profond)
- **Background** : Gradient fixe

### Classes Glassmorphiques
- `.glass-card` - Cartes avec effet verre
- `.glass-button` - Boutons glassmorphiques
- `.glass-input` - Inputs avec backdrop-blur

### Responsive
- Mobile-first (320px minimum)
- Breakpoints : 640px, 768px, 1024px
- WCAG 2.1 AA compliant (320px @ 200% zoom)
- Boutons minimum 44px hauteur

## Structure

```
front/
├── src/
│   ├── pages/           # Pages (Landing, Login, Register, Dashboard, Profile, Legal, Privacy)
│   ├── components/      # Composants réutilisables (Header, Footer)
│   ├── store/           # Zustand stores (authStore)
│   ├── services/        # API calls (api.js)
│   ├── App.jsx          # Router principal
│   └── main.jsx         # Point d'entrée
├── public/              # Assets statiques (logo, favicon)
└── package.json
```

## Authentification

- JWT stocké dans localStorage (Zustand persist)
- Routes protégées avec navigation conditionnelle
- Auto-redirect si non authentifié
- 6 rôles Agile : Product Owner, Scrum Master, Developer, Tester, Designer, Stakeholder

## Déploiement Vercel

1. Créer projet Vercel
2. Connecter repo GitHub
3. Ajouter `VITE_API_URL` dans variables d'environnement
4. Deploy automatique sur push main

## Scripts

- `npm run dev` - Serveur développement
- `npm run build` - Build production
- `npm run preview` - Preview build local
- `npm run lint` - Linter ESLint

## Fonctionnalités v1.0.0

- Authentification (Login/Register) avec sélection rôle
- CRUD User Stories format Agile ("En tant que... je veux... afin de...")
- Kanban Board 3 colonnes (Todo/Doing/Done)
- Tri par priorité (High/Medium/Low)
- Modal création/édition avec fermeture ESC/click/croix
- Profile utilisateur avec changement mot de passe
- Pages légales (Mentions légales, Politique de confidentialité)
- Design glassmorphique responsive 320px+
- Header/Footer sur toutes les pages

## Roadmap v1.1.0

- Drag & Drop Kanban
- Filtres et recherche User Stories
- Notifications toast
- Export/Import JSON/CSV
- Stats avec timer et burndown charts
- Messagerie collaboration
- Dark/Light Mode toggle

## Licence

Projet formation DWWM 2025 - kydoCode
