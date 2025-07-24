import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { sequelize, initDb } from './src/db/sequelize.js';
import findAllpokemons from './src/routes/findAllpokemons.js';
import findPokemonByPk from './src/routes/findPokemonByPk.js';
import createPokemon from './src/routes/createPokemon.js';
import updatePokemon from './src/routes/updatePokemon.js';
import deletePokemon from './src/routes/deletePokemon.js';

const app = express();
const port = 3001;

// app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev')).use(bodyParser.json());

initDb();
findAllpokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);

app.use((res) => {
	const message =
		'impossible de trouver la ressource demandée, essayez une autre URL';
	res.status(404).json({ message });
});

// app.use((req, res, next) => {
// 	console.log(`URL: ${req.url}`);
// 	next();
// });

// const logger = (req, res, next) => {
// 	console.log(`URL: ${req.url}`);
// 	next();
// };
// app.use(logger);
// app.get('/', (req, res) => {
// 	res.send('Hello express 2v');
// });

// // on utilise notre liste de pokemons dans notre point de terminaison
// app.get('/api/pokemons/:id', (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const pokemon = pokemons.find((pokemon) => pokemon.id === id);
// 	const message = 'un pokemon a été trouvé';
// 	// res.send(`vous avez demandé le pokemon ${pokemon.name}`);
// 	res.json(success(message, pokemon));
// });
// app.get('/api/pokemons', (req, res) => {
// 	// const size = req.params.size;
// 	// const lenh = pokemons.length;
// 	// res.send(`Il y a ${lenh} pokemons dans le pokédex pour le moment.`);
// 	const message = 'Liste des pokemons';
// 	res.json(success(message, pokemons));
// });
// app.post('/api/pokemons', (req, res) => {
// 	const id = getUniqueId(pokemons);
// 	const createPokemon = { ...req.body, ...{ id: id, created: new Date() } };
// 	pokemons.push(createPokemon);
// 	const message = `le pokemon ${createPokemon.name} a été créé avec succès`;
// 	res.json(success(message, createPokemon));
// });

// app.put('/api/pokemons/:id', (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const pokemonUpdate = { ...req.body, id: id };
// 	const index = pokemons.findIndex((pokemon) => pokemon.id === id);
// 	if (index === -1) {
// 		return res.status(404).json({ message: 'Pokemon not found' });
// 	}
// 	pokemons[index] = pokemonUpdate;
// 	const message = `le pokemon ${pokemonUpdate.name} a été mis à jour avec succès`;
// 	res.json(success(message, pokemonUpdate));
// });

// app.delete('/api/pokemons/:id', (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const index = pokemons.findIndex((pokemon) => pokemon.id === id);
// 	if (index === -1) {
// 		return res.status(404).json({ message: 'Pokemon not found' });
// 	}
// 	const deletedPokemon = pokemons.splice(index, 1)[0];
// 	const message = `le pokemon ${deletedPokemon.name} a été supprimé avec succès`;
// 	res.json(success(message, deletedPokemon));
// });
app.listen(port, () => console.log(`server is running on port ${port}`));
