import { Pokemon } from '../db/sequelize.js';
import { Op } from 'sequelize';

export default (app) => {
	app.get('/api/pokemons', (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
			const limit = parseInt(req.query.limit) || 5;

			if (name.length < 2) {
				const message =
					'le terme de recherche doit contenir au moins 2 caractères.';
				return res.status(400).json({ message });
			}

			return /*Pokemon.findAll*/ Pokemon.findAndCountAll({
				where: {
					name: {
						//"name" est la propriété du modèle Pokemon
						// [Op.eq]: name, // "name" est le critère de la recherche
						[Op.like]: `%${name}%`,
					},
				},
				order: ['name'],
				limit: /*5*/ limit,
			}).then((/*pokemons*/ { count, rows }) => {
				const message = `Il y a ${
					/*pokemons.length*/ count
				} pokémons qui correspondent au terme de la recherche ${name}.`;
				res.json({ message, data: /*pokemons*/ rows });
			});
		} else {
			Pokemon.findAll({ order: ['name'] })
				.then((pokemons) => {
					const message = 'La liste des pokémons a bien été récupérée.';
					res.json({ message, data: pokemons });
				})
				.catch((error) => {
					const message =
						"La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.";
					res.status(500).json({ message, data: error });
				});
		}
	});
};
// src/routes/findAllpokemons.js
// This file defines a route to retrieve all Pokémon from the database.
