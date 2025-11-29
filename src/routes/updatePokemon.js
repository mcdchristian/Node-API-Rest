import { Pokemon } from '../db/sequelize.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default (app) => {
	app.put('/api/pokemons/:id', (req, res) => {
		const id = req.params.id;
		Pokemon.update(req.body, {
			where: { id: id },
		})
			.then((_) => {
				return Pokemon.findByPk(id).then((pokemon) => {
					if (pokemon === null) {
						const message =
							"Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
						return res.status(404).json({ message });
					}
					const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
					res.json({ message, data: pokemon });
				});
			})
			.catch((error) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				if (error instanceof UniqueConstraintError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message =
					"Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
				res.status(500).json({ message, data: error });
			});
	});
};

// refreshing js basics with node repl

// var name = ' max';
// var age = 28;
// var hasHobbies = true;

// function summarizeUser(userName, userAge, userHasHobby) {
// 	return (
// 		'Name is' +
// 		userName +
// 		', Age is ' +
// 		userAge +
// 		' and the user has hobbies:' +
// 		userHasHobby
// 	);
// }

// console.log(summarizeUser(name, age, hasHobbies));
