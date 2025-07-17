import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
	res.send('Hello express 2v');
});
app.get('/api/pokemons/:id', (req, res) => {
	const id = req.params.id;
	res.send(`vous avez demandé le pokemon avec avec l'id ${id}`);
});
app.listen(port, () => console.log(`server is running on port ${port}`));
