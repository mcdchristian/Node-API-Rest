import express from 'express';

import morgan from 'morgan';
import { sequelize, initDb } from './src/db/sequelize.js';
import findAllpokemons from './src/routes/findAllpokemons.js';
import findPokemonByPk from './src/routes/findPokemonByPk.js';
import createPokemon from './src/routes/createPokemon.js';
import updatePokemon from './src/routes/updatePokemon.js';
import deletePokemon from './src/routes/deletePokemon.js';
import login from './src/routes/login.js';

const app = express();
const port = 3001;

// app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev'));
app.use(express.json());

initDb();
findAllpokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
login(app);

app.use((req, res) => {
	const message =
		'impossible de trouver la ressource demandée, essayez une autre URL';
	res.status(404).json({ message });
});


app.listen(port, () => console.log(`server is running on port ${port}`));
