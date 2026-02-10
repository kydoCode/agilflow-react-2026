# AgilFlow Frontend

Interface web pour gérer vos User Stories en mode Agile avec un tableau Kanban interactif.

## Prérequis

- Node.js 20.19+ ou 22.12+
- npm ou yarn
- Accès à l'API AgilFlow (backend)

## Installation

1. Cloner le repository
2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:3000/api
```

Remplacer l'URL par celle de votre API en production.

## Lancer l'application

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Mode production

```bash
npm run build
npm run preview
```

## Utilisation

### Première connexion

1. Créer un compte via le bouton "S'inscrire"
2. Renseigner nom, email, mot de passe et choisir votre rôle Agile
3. Se connecter avec vos identifiants

### Gérer vos User Stories

**Créer une User Story** :
- Cliquer sur "+ Add Task"
- Remplir les champs au format Agile :
  - "En tant que" : votre rôle (utilisateur, admin, etc.)
  - "Je veux" : l'action souhaitée
  - "Afin de" : l'objectif final
- Choisir priorité (Low/Medium/High) et statut (Todo/Doing/Done)

**Modifier une User Story** :
- Cliquer sur "Edit" dans la carte
- Modifier les champs
- Sauvegarder

**Supprimer une User Story** :
- Cliquer sur "Delete" dans la carte
- Confirmer la suppression

**Organiser le Kanban** :
- Les User Stories sont triées automatiquement par priorité
- 3 colonnes : Todo (à faire), Doing (en cours), Done (terminé)
- Modifier le statut via le formulaire d'édition

### Gérer votre profil

- Cliquer sur votre nom dans le header
- Consulter vos informations
- Modifier votre mot de passe si nécessaire

## Technologies utilisées

- React 18 avec Vite
- TailwindCSS pour le design glassmorphique
- Zustand pour la gestion d'état
- React Router pour la navigation

## Support navigateurs

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Responsive mobile à partir de 320px

## Déploiement

L'application peut être déployée sur Vercel, Netlify ou tout hébergeur supportant les applications React.

Penser à configurer la variable d'environnement `VITE_API_URL` avec l'URL de votre API en production.

## Licence

Projet fil rouge TP DWWM 2024/2025
