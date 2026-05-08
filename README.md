# Node API Rest - Pokédex API

A RESTful API built with Node.js and Express.js for managing Pokémon data with user authentication. This project demonstrates CRUD operations, JWT authentication, and database management using Sequelize ORM with MariaDB.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Author](#author)

## ✨ Features

- **Complete CRUD Operations** - Create, Read, Update, and Delete Pokémon
- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **RESTful API Design** - Clean and intuitive endpoint structure
- **Database ORM** - Sequelize for type-safe database operations
- **Input Validation** - Server-side validation for all Pokémon attributes
- **Error Handling** - Comprehensive error responses
- **Development Tools** - Nodemon for automatic server restart during development
- **Request Logging** - Morgan middleware for HTTP request logging

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MariaDB** (v10.4 or higher)

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/mcdchristian/Node-API-Rest.git
cd Node-API-Rest
```

2. **Install dependencies**

```bash
npm install
```

3. **Create the MariaDB database**

```bash
mysql -u root -p
CREATE DATABASE pokedex;
EXIT;
```

## ⚙️ Configuration

Update the database connection settings in `src/db/sequelize.js`:

```javascript
const sequelize = new Sequelize('pokedex', 'root', '', {
	host: 'localhost',
	dialect: 'mariadb',
	dialectOptions: {
		timezone: 'Etc/GMT-2',
	},
	logging: false,
});
```

Modify these values according to your MariaDB configuration:

- Database name: `pokedex`
- Username: `root`
- Password: `''` (empty)
- Host: `localhost`
- Timezone: `Etc/GMT-2`

## 🚀 Running the Application

Start the development server with automatic reload:

```bash
npm start
```

The API will be available at:

```
http://localhost:3001
```

## 📡 API Endpoints

### Get All Pokémon

```http
GET /api/pokemons
```

**Response:**

```json
{
	"message": "La liste de tous les pokémons a été récupérée avec succès.",
	"data": [
		{
			"id": 1,
			"name": "Bulbizarre",
			"hp": 45,
			"cp": 49,
			"types": "Plante, Poison",
			"picture": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
		}
	]
}
```

### Get Pokémon by ID

```http
GET /api/pokemons/:id
```

**Response:**

```json
{
	"message": "Le pokémon a été récupéré avec succès.",
	"data": { ... }
}
```

### Create a New Pokémon

```http
POST /api/pokemons
Content-Type: application/json

{
	"name": "Pikachu",
	"hp": 35,
	"cp": 55,
	"picture": "https://...",
	"types": "Electrik"
}
```

**Validation Rules:**

- Name must be unique and non-empty
- HP must be a positive integer ≥ 0
- CP must be a positive integer ≥ 0
- Types must be from: Plante, Poison, Feu, Eau, Insecte, Vol, Normal, Electrik, Fée

### Update Pokémon

```http
PUT /api/pokemons/:id
Content-Type: application/json

{
	"name": "Pikachu",
	"hp": 40,
	"cp": 60,
	"types": "Electrik"
}
```

### Delete Pokémon

```http
DELETE /api/pokemons/:id
```

## 🔐 Authentication

### Login

```http
POST /api/login
Content-Type: application/json

{
	"username": "admin",
	"password": "password123"
}
```

**Response:**

```json
{
	"message": "L'utilisateur a été connecté avec succès.",
	"data": {
		"id": 1,
		"username": "admin"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Details:**

- Type: JWT (JSON Web Token)
- Expiration: 24 hours
- Algorithm: HS256

**Using the Token:**
Include the token in the Authorization header for protected routes:

```http
Authorization: Bearer <your_token_here>
```

## 🗄️ Database Schema

### Pokémon Table

| Column    | Type      | Constraints                 |
| --------- | --------- | --------------------------- |
| id        | INTEGER   | PRIMARY KEY, AUTO INCREMENT |
| name      | VARCHAR   | UNIQUE, NOT NULL            |
| hp        | INTEGER   | NOT NULL, ≥ 0               |
| cp        | INTEGER   | NOT NULL, ≥ 0               |
| types     | STRING    | NOT NULL                    |
| picture   | STRING    | NOT NULL                    |
| createdAt | TIMESTAMP | AUTO                        |
| updatedAt | TIMESTAMP | AUTO                        |

### User Table

| Column    | Type      | Constraints                   |
| --------- | --------- | ----------------------------- |
| id        | INTEGER   | PRIMARY KEY, AUTO INCREMENT   |
| username  | VARCHAR   | UNIQUE, NOT NULL              |
| password  | VARCHAR   | NOT NULL (hashed with bcrypt) |
| createdAt | TIMESTAMP | AUTO                          |
| updatedAt | TIMESTAMP | AUTO                          |

## 📁 Project Structure

```
Node-API-Rest/
├── app.js                      # Main application entry point
├── package.json               # Project dependencies and scripts
├── public/                    # Static files
├── src/
│   ├── auth/
│   │   ├── auth.js           # Authentication middleware
│   │   └── private_key.js    # JWT secret key
│   ├── db/
│   │   ├── sequelize.js      # Database configuration and initialization
│   │   └── mock-pokemon.js   # Sample Pokémon data
│   ├── models/
│   │   ├── pokemon.js        # Pokémon model definition
│   │   └── user.js           # User model definition
│   └── routes/
│       ├── findAllpokemons.js    # GET all Pokémon
│       ├── findPokemonByPk.js    # GET Pokémon by ID
│       ├── createPokemon.js      # POST create Pokémon
│       ├── updatePokemon.js      # PUT update Pokémon
│       ├── deletePokemon.js      # DELETE Pokémon
│       └── login.js             # POST user login
└── README.md                  # Project documentation
```

## 🛠️ Technologies Used

| Technology      | Version        | Purpose                               |
| --------------- | -------------- | ------------------------------------- |
| **Node.js**     | 14+            | JavaScript runtime                    |
| **Express.js**  | Latest         | Web framework                         |
| **Sequelize**   | ^6.37.8        | ORM for Node.js                       |
| **MariaDB**     | ^3.4.4         | Relational database                   |
| **JWT**         | ^9.0.2         | Token-based authentication            |
| **bcrypt**      | ^6.0.0         | Password hashing                      |
| **Morgan**      | Latest         | HTTP request logger                   |
| **Body-parser** | ^2.2.1         | Middleware for parsing request bodies |
| **Nodemon**     | Dev dependency | Auto-reload during development        |

## 🔍 Available Pokémon Types

The API supports the following Pokémon types:

- Plante (Grass)
- Poison
- Feu (Fire)
- Eau (Water)
- Insecte (Bug)
- Vol (Flying)
- Normal
- Electrik (Electric)
- Fée (Fairy)

## 📝 Example Usage

### Using cURL

```bash
# Get all Pokémon
curl http://localhost:3001/api/pokemons

# Get Pokémon by ID
curl http://localhost:3001/api/pokemons/1

# Create a new Pokémon
curl -X POST http://localhost:3001/api/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name":"Charizard","hp":78,"cp":84,"types":"Feu","picture":"https://..."}'

# Login
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### Using Postman

1. Import the endpoints listed above into Postman
2. For POST/PUT requests, select "Body" → "raw" → "JSON"
3. Use the token from login in the Authorization header for protected routes

## 🐛 Troubleshooting

**MariaDB Connection Error:**

- Ensure MariaDB service is running
- Verify credentials in `src/db/sequelize.js`
- Check database `pokedex` exists

**Port 3001 Already in Use:**

```bash
# Kill the process using port 3001
lsof -ti:3001 | xargs kill -9
```

**Validation Errors:**

- Check that Pokémon name is unique
- Ensure HP and CP are positive integers
- Verify types are from the supported list

## 📄 License

ISC

## 👤 Author

**Del'or Mutaliko**

- GitHub: [@mcdchristian](https://github.com/mcdchristian)
- Repository: [Node-API-Rest](https://github.com/mcdchristian/Node-API-Rest)

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/mcdchristian/Node-API-Rest/issues).

---

**Version:** 1.0.0  
**Last Updated:** May 2026
