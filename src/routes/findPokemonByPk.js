import { Pokemon } from '../db/sequelize.js';
import auth from '../auth/auth.js';

export default (app) => {
	app.get('/api/pokemons/:id', auth, (req, res) => {
		Pokemon.findByPk(req.params.id)
			.then((pokemon) => {
				if (pokemon === null) {
					const message =
						"le pokemon demandé n'existe pas. Réessayez avec un autre identifiant";
					return res.status(404).json({ message });
				}
				const message = 'Un pokémon a bien été trouvé.';
				res.json({ message, data: pokemon });
			})
			.catch((error) => {
				const message =
					"le pokemon n'a pas pu être recupéré. Résessayez dans quelques instants";
				res.status(500).json({ message, data: error });
			});
	});
};
// src/routes/findPokemonByPk.js

//filter method example

// filter method exmple

// const filteredPrices = prices.filter((price) => price > 6);
// console.log(filteredPrices);

// const fruits = ['pomme', 'banane', 'poire', 'pomme'];
// const pommes = fruits.filter((fruit, index, arr) => {
// 	console.log(`Index: ${index}, Tableau: ${arr}`);
// 	return fruit === 'pomme';
// });

// console.log(pommes);
