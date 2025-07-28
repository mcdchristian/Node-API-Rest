import { Pokemon } from '../db/sequelize.js';

export default (app) => {
	app.get('/api/pokemons', (req, res) => {
		Pokemon.findAll()
			.then((pokemons) => {
				const message = 'La liste des pokémons a bien été récupérée.';
				res.json({ message, data: pokemons });
			})
			.catch((error) => {
				const message =
					"La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.";
				res.status(500).json({ message, data: error });
			});
	});
};
// src/routes/findAllpokemons.js
// This file defines a route to retrieve all Pokémon from the database.
