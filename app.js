import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { createRequire } from 'module';
import morgan from 'morgan';
import { success } from './helper.js';
import pokemons from './mock-pokemon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(favicon(path.join(__dirname, 'favicon.ico'))).use(morgan('dev'));

// app.use((req, res, next) => {
// 	console.log(`URL: ${req.url}`);
// 	next();
// });

// const logger = (req, res, next) => {
// 	console.log(`URL: ${req.url}`);
// 	next();
// };
// app.use(logger);
app.get('/', (req, res) => {
	res.send('Hello express 2v');
});

// on utilise notre liste de pokemons dans notre point de terminaison
app.get('/api/pokemons/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const pokemon = pokemons.find((pokemon) => pokemon.id === id);
	const message = 'un pokemon a été trouvé';
	// res.send(`vous avez demandé le pokemon ${pokemon.name}`);
	res.json(success(message, pokemon));
});
app.get('/api/pokemons', (req, res) => {
	// const size = req.params.size;
	// const lenh = pokemons.length;
	// res.send(`Il y a ${lenh} pokemons dans le pokédex pour le moment.`);
	const message = 'Liste des pokemons';
	res.json(success(message, pokemons));
});
app.listen(port, () => console.log(`server is running on port ${port}`));
