import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import PokemonModel from '../models/pokemon.js';
import UserModel from '../models/user.js';
import pokemons from './mock-pokemon.js';
import bcrypt from 'bcrypt';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pokedex',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mariadb',
    dialectOptions: {
      timezone: process.env.DB_TIMEZONE || 'Etc/GMT-2',
    },
    logging: false,
  }
);

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

/**
 * Initialize Database
 * - In development: sync with force=true to reset data
 * - In production: only create tables if they don't exist
 */
const initDb = async () => {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const forceSync = isDevelopment; // Only force sync in development

    console.log('🔄 Synchronizing database...');
    await sequelize.sync({ force: forceSync });
    console.log('✅ Database synchronized successfully');

    // Only seed data in development mode
    if (isDevelopment) {
      const userCount = await User.count();
      const pokemonCount = await Pokemon.count();

      if (pokemonCount === 0) {
        console.log('🌱 Seeding Pokémon data...');
        for (const pokemon of pokemons) {
          await Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types,
          });
        }
        console.log('✅ Pokémon data seeded');
      }

      if (userCount === 0) {
        console.log('🌱 Creating default user...');
        const hashedPassword = await bcrypt.hash('pikachu', 10);
        await User.create({
          username: 'pikachu',
          password: hashedPassword,
        });
        console.log('✅ Default user created (username: pikachu, password: pikachu)');
      }
    }

    console.log('🎉 Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export { initDb, Pokemon, sequelize, User };
