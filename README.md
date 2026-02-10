# 🎨 AgilFlow Frontend

Application React moderne avec design glassmorphique pour la gestion de User Stories.

## 🚀 Stack Technique

- **Framework** : React 18
- **Build** : Vite 7
- **Styling** : TailwindCSS (Glassmorphisme)
- **State** : Zustand
- **Routing** : React Router 7
- **HTTP** : Fetch API

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

```bash
cp .env.example .env
```

Éditer `.env` :
```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃 Développement

```bash
npm run dev
```

App disponible sur `http://localhost:5173`

## 🏗️ Build Production

```bash
npm run build
npm run preview
```

## 🎨 Design System

### Palette Couleurs
- **Primaire** : Bleu (#3B82F6)
- **Accent** : Vert (#10B981)
- **Neutre** : Gris (#64748B)

### Classes Glassmorphiques
- `.glass-card` - Cartes avec effet verre
- `.glass-button` - Boutons glassmorphiques
- `.glass-input` - Inputs avec backdrop-blur

### Responsive
- Mobile-first
- Breakpoints : 640px, 768px, 1024px
- WCAG 2.1 compliant (320px @ 200% zoom)

## 📁 Structure

```
front/
├── src/
│   ├── pages/           # Pages (Login, Register, Dashboard)
│   ├── components/      # Composants réutilisables
│   ├── store/           # Zustand stores
│   ├── services/        # API calls
│   ├── App.jsx          # Router principal
│   └── main.jsx         # Point d'entrée
├── public/
└── package.json
```

## 🔐 Authentification

- JWT stocké dans localStorage (Zustand persist)
- Routes protégées avec ProtectedRoute
- Auto-redirect si non authentifié

## 🚀 Déploiement Vercel

1. Créer projet Vercel
2. Connecter repo GitHub
3. Ajouter `VITE_API_URL` dans variables
4. Deploy automatique sur push

## 📝 Scripts

- `npm run dev` - Serveur développement
- `npm run build` - Build production
- `npm run preview` - Preview build local
- `npm run lint` - Linter ESLint

## 🎯 Fonctionnalités

- ✅ Authentification (Login/Register)
- ✅ CRUD User Stories
- ✅ Dashboard avec filtres
- ✅ Design glassmorphique responsive
- ✅ Toast notifications
- ✅ Loading states

## 📄 Licence

Projet formation DWWM 2025
