# 🐱‍🚀 Pokédex API - Node.js REST API

Une API REST sécurisée pour gérer une base de données Pokémon, avec authentification JWT, validation des données, et meilleures pratiques de sécurité.

## ✨ Fonctionnalités

- 🔐 **Authentification JWT** - Authentification sécurisée basée sur les tokens
- 📝 **Validation des données** - Validation stricte des entrées avec Joi
- 🛡️ **Sécurité renforcée** - Helmet, CORS, Rate Limiting
- 🗄️ **Base de données** - Sequelize ORM avec MariaDB/MySQL
- 🔍 **Recherche avancée** - Recherche et filtrage de Pokémons
- 📊 **Gestion d'erreurs** - Middleware centralisé pour les erreurs
- 🚀 **Hot Reload** - Développement avec Nodemon
- 📋 **Code Quality** - ESLint et Prettier configurés

## 📋 Prérequis

- **Node.js** >= 16.x
- **npm** >= 8.x
- **MariaDB/MySQL** en cours d'exécution

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/mcdchristian/Node-API-Rest.git
cd Node-API-Rest
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos paramètres
# Particulièrement:
# - DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
# - JWT_SECRET_KEY (générez une clé sécurisée!)
```

### 4. Démarrer le serveur

#### Mode développement (avec hot-reload)
```bash
npm run dev
```

#### Mode production
```bash
NODE_ENV=production npm start
```

## 🔌 Endpoints API

### 🔑 Authentification

#### POST `/api/auth/login`
Connecter un utilisateur et récupérer un JWT token.

**Requête:**
```json
{
  "username": "pikachu",
  "password": "pikachu"
}
```

**Réponse (200):**
```json
{
  "message": "Connexion réussie.",
  "data": {
    "id": 1,
    "username": "pikachu",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🦾 Pokémons

#### GET `/api/pokemons`
Récupérer tous les Pokémons (avec authentification).

**Headers:**
```
Authorization: Bearer <token>
```

**Paramètres de requête optionnels:**
- `name` (string) - Rechercher par nom (min 2 caractères)
- `limit` (number) - Limiter le nombre de résultats (défaut: 5)

**Exemple:**
```bash
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:3001/api/pokemons?name=pikachu&limit=10"
```

---

#### GET `/api/pokemons/:id`
Récupérer un Pokémon par son ID.

**Réponse (200):**
```json
{
  "message": "Pokémon récupéré avec succès.",
  "data": {
    "id": 1,
    "name": "Pikachu",
    "hp": 35,
    "cp": 55,
    "picture": "https://...",
    "types": "electric"
  }
}
```

---

#### POST `/api/pokemons`
Créer un nouveau Pokémon (authentification requise).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Requête:**
```json
{
  "name": "Raichu",
  "hp": 60,
  "cp": 90,
  "picture": "https://example.com/raichu.png",
  "types": "electric"
}
```

---

#### PUT `/api/pokemons/:id`
Mettre à jour un Pokémon.

**Requête:**
```json
{
  "hp": 65,
  "cp": 100
}
```

---

#### DELETE `/api/pokemons/:id`
Supprimer un Pokémon.

**Réponse (200):**
```json
{
  "message": "Le pokémon \"Pikachu\" a été supprimé avec succès.",
  "data": { ... }
}
```

---

### 🏥 Santé du serveur

#### GET `/health`
Vérifier l'état du serveur.

**Réponse:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 Sécurité

### Bonnes pratiques implémentées

1. **JWT Authentication**
   - Tokens avec expiration (par défaut 24h)
   - Clé secrète stockée dans les variables d'environnement
   - Validation stricte du format Bearer

2. **Validation des données**
   - Joi pour la validation de toutes les entrées
   - Messages d'erreur clairs
   - Prévention des injection SQL/NoSQL

3. **Middleware de sécurité**
   - **Helmet** - Définit des en-têtes HTTP de sécurité
   - **CORS** - Contrôle l'accès cross-origin
   - **Rate Limiting** - Limite les requêtes par IP (100 req/15 min par défaut)

4. **Gestion des erreurs**
   - Middleware centralisé
   - Pas d'exposition des traces d'erreur en production
   - Codes HTTP appropriés

5. **Variables d'environnement**
   - Pas de secrets en dur
   - Configuration par fichier `.env`

## 🛠️ Scripts disponibles

```bash
# Démarrage
npm run dev          # Développement avec hot-reload
npm start            # Production

# Code Quality
npm run lint         # Vérifier avec ESLint
npm run lint:fix     # Fixer les erreurs ESLint
npm run format       # Formater avec Prettier
npm run format:check # Vérifier la mise en forme
```

## 📁 Structure du projet

```
Node-API-Rest/
├── src/
│   ├── auth/
│   │   ├── auth.js              # Middleware d'authentification JWT
│   │   └── private_key.js        # Configuration de la clé JWT
│   ├── db/
│   │   ├── sequelize.js          # Configuration Sequelize & initialisation BD
│   │   └── mock-pokemon.js       # Données de seed
│   ├── middleware/
│   │   ├── errorHandler.js       # Gestion centralisée des erreurs
│   │   └── validation.js         # Middleware de validation avec Joi
│   ├── models/
│   │   ├── pokemon.js            # Modèle Pokemon Sequelize
│   │   └── user.js               # Modèle User Sequelize
│   └── routes/
│       ├── auth.js               # Routes d'authentification
│       ├── pokemons.js           # Routes de recherche GET
│       └── pokemonCRUD.js        # Routes POST/PUT/DELETE
├── .env                          # Variables d'environnement (local)
├── .env.example                  # Template de configuration
├── .eslintrc.json               # Configuration ESLint
├── .prettierrc.json             # Configuration Prettier
├── .gitignore                   # Fichiers à ignorer
├── app.js                       # Point d'entrée principal
├── package.json                 # Dépendances Node
└── README.md                    # Ce fichier
```

## 🔄 Flux d'authentification

1. **Login** : `POST /api/auth/login` avec credentials
2. **Récupérer le token** : Réponse contient `token`
3. **Utiliser le token** : Ajouter à l'en-tête: `Authorization: Bearer TOKEN`
4. **Renouveler** : Le token expire après 24h, re-login pour un nouveau

## 🐛 Résolution de problèmes

### "Cannot connect to database"
- Vérifier que MariaDB/MySQL est démarré
- Vérifier les credentials dans `.env`
- Vérifier le host et le port

### "JWT_SECRET_KEY must be defined"
- Le projet est en mode production sans JWT_SECRET_KEY
- Définir `JWT_SECRET_KEY` dans `.env`

### "Token malformé ou invalide"
- Vérifier que vous utilisez le format: `Authorization: Bearer <token>`
- Vérifier que le token n'a pas expiré
- Vous reconnecter pour un nouveau token

### Problèmes de CORS
- Vérifier `CORS_ORIGIN` dans `.env`
- Par défaut: `http://localhost:3000`

## 📊 Rate Limiting

Configuré par défaut à:
- **100 requêtes** par IP
- **Fenêtre de 15 minutes**

À personnaliser dans `.env`:
```env
RATE_LIMIT_WINDOW_MS=900000    # milliseconds
RATE_LIMIT_MAX_REQUESTS=100    # number of requests
```

## 🚀 Déploiement

### Checklist avant production

- [ ] `NODE_ENV=production` dans les variables d'environnement
- [ ] Générer une clé JWT sécurisée: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Configurer les credentials de base de données en production
- [ ] Vérifier les règles de `CORS_ORIGIN`
- [ ] Configurer un reverse proxy (nginx/Apache)
- [ ] Activer HTTPS/TLS

### Exemple avec PM2

```bash
npm install -g pm2
pm2 start app.js --name "pokemon-api"
pm2 save
pm2 startup
```

## 📝 Variables d'environnement

Voir `.env.example` pour la liste complète.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

ISC

## 👨‍💻 Auteur

**Delormcd** - [GitHub](https://github.com/mcdchristian)

---

**Made with ❤️ for Pokémon lovers**
