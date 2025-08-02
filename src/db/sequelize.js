import { Sequelize, DataTypes } from 'sequelize';
import PokemonModel from '../models/pokemon.js';
import UserModel from '../models/user.js';
import pokemons from './mock-pokemon.js';
import bcrypt, { hash } from 'bcrypt';

const sequelize = new Sequelize('pokedex', 'root', '', {
	host: 'localhost',
	dialect: 'mariadb',
	dialectOptions: {
		timezone: 'Etc/GMT-2',
	},
	logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
	return sequelize.sync({ force: true }).then((_) => {
		console.log('INIT DB');
		pokemons.map((pokemon) => {
			Pokemon.create({
				name: pokemon.name,
				hp: pokemon.hp,
				cp: pokemon.cp,
				picture: pokemon.picture,
				types: pokemon.types,
			}).then((pokemon) => console.log(pokemon.toJSON()));
		});
		bcrypt
			.hash('pikachu', 10)
			.then((hash) => User.create({ username: 'pikachu', password: hash }))
			.then((user) => console.log(user.toJSON()));

		console.log('La base de donnée a bien été initialisée !');
	});
};

export { initDb, Pokemon, sequelize, User };
