# SHIPMATCH - Maritime Tinder Application

Une application web moderne qui met en relation les affréteurs et les armateurs dans le secteur maritime, avec un système de matching inspiré de Tinder.

## 🚀 Stack Technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le dev server
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Mode sombre/clair** avec persistance

### Backend
- **Node.js** avec Express
- **PostgreSQL** pour la base de données
- **JWT** pour l'authentification
- **Bcrypt** pour le hashage des mots de passe
- **CORS** configuré pour le développement

## 📦 Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL (v13+)
- npm ou yarn

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données

#### Installer PostgreSQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS avec Homebrew
brew install postgresql
brew services start postgresql

# Windows
# Télécharger depuis https://www.postgresql.org/download/windows/
```

#### Créer la base de données
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer l'utilisateur et la base
CREATE USER shipmatch_user WITH PASSWORD 'your_password_here';
CREATE DATABASE shipmatch OWNER shipmatch_user;
GRANT ALL PRIVILEGES ON DATABASE shipmatch TO shipmatch_user;
\q
```

### 3. Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos paramètres
nano .env
```

### 4. Initialisation de la base de données
```bash
# Créer les tables
npm run db:setup

# Insérer les données de test
npm run db:seed
```

## 🏃‍♂️ Démarrage

### Mode développement (Frontend + Backend)
```bash
npm run dev
```

### Démarrage séparé
```bash
# Backend seulement
npm run dev:server

# Frontend seulement  
npm run dev:client
```

L'application sera accessible sur :
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001
- **Health check** : http://localhost:3001/health

## 🔐 Authentification

### Comptes de test
Après avoir exécuté `npm run db:seed`, vous pouvez utiliser :

**Armateur (Ship Owner)**
- Email: `sarah@balticshipping.com`
- Password: `password123`

**Affréteur (Charterer)**
- Email: `marcus@globaltrade.com`
- Password: `password123`

### API Endpoints

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour du profil

#### Navires
- `GET /api/ships` - Liste des navires (avec filtres)
- `GET /api/ships/:id` - Détail d'un navire
- `POST /api/ships` - Créer un navire (armateurs uniquement)
- `GET /api/ships/my/ships` - Mes navires

#### Matches
- `POST /api/matches` - Créer un match
- `GET /api/matches/my` - Mes matches
- `PUT /api/matches/:id/status` - Mettre à jour le statut

## 🏗️ Structure du projet

```
├── src/                    # Frontend React
│   ├── components/         # Composants React
│   ├── contexts/          # Contextes (Theme, Auth)
│   ├── data/              # Données mockées
│   ├── types/             # Types TypeScript
│   └── ...
├── server/                # Backend Node.js
│   ├── config/            # Configuration DB
│   ├── models/            # Modèles de données
│   ├── routes/            # Routes API
│   ├── middleware/        # Middlewares (auth, etc.)
│   ├── scripts/           # Scripts DB (setup, seed)
│   └── index.js           # Point d'entrée serveur
└── ...
```

## 🔧 Scripts disponibles

- `npm run dev` - Démarrage complet (frontend + backend)
- `npm run dev:client` - Frontend uniquement
- `npm run dev:server` - Backend uniquement
- `npm run build` - Build de production
- `npm run db:setup` - Création des tables
- `npm run db:seed` - Insertion des données de test

## 🌟 Fonctionnalités

### ✅ Implémentées
- Authentification complète (register/login/JWT)
- Interface utilisateur moderne avec mode sombre
- Système de swipe pour matcher les navires
- Gestion des profils utilisateurs
- API REST complète
- Base de données PostgreSQL
- Données de test réalistes

### 🚧 À venir
- Chat en temps réel
- Notifications push
- Géolocalisation avancée
- Système de paiement
- Dashboard analytics
- Mobile app (React Native)

## 🐛 Dépannage

### Erreur de connexion à la base
```bash
# Vérifier que PostgreSQL fonctionne
sudo systemctl status postgresql

# Redémarrer si nécessaire
sudo systemctl restart postgresql
```

### Port déjà utilisé
```bash
# Trouver le processus utilisant le port
lsof -i :3001
lsof -i :5173

# Tuer le processus
kill -9 <PID>
```

## 📝 Licence

MIT License - voir le fichier LICENSE pour plus de détails.#   d o c k i t b a c k  
 