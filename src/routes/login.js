import { User } from '../db/sequelize.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';

export default (app) => {
	app.post('/api/login', (req, res) => {
		User.findOne({ where: { username: req.body.username } })
			.then((user) => {
				if (!user) {
					const message = "L'utilisateur demandé n'existe pas.";
					return res.status(404).json({ message });
				}
				bcrypt
					.compare(req.body.password, user.password)
					.then((isPasswordValid) => {
						if (!isPasswordValid) {
							const message = `le mot de passe est incorrect`;
							return res.status(401).json({ message });
						}
						//JWT
						const token = jwt.sign({ userId: user.id }, privateKey, {
							expiresIn: '24h',
						});

						const message = `L'utilisateur a été connecté avec succès.`;
						return res.json({ message, data: user, token });
					});
			})
			.catch((error) => {
				const message =
					"L'utilistateur n'a pas pu être connecté. Réessayez dans quelques instants.";
				return res.json({ message, data: error });
			});
	});
};

// export default (sequelize, DataTypes) => {
// 	return sequelize.define('User', {
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		username: {
// 			type: DataTypes.STRING,
// 			unique: { msg: 'le nom est déjà pris' },
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 		},
// 	});
// };

// refreshing js basics object and array spread operator/rest operator
// const copiedPerson = { ...person };
// console.log(copiedPerson);

// const hobbies = ['Sports', 'Cooking'];
// // for (const hobby of hobbies) {
// // 	console.log(hobby);
// // }
// // console.log(hobbies.map((hobby) => 'Hobby: ' + hobby));
// // console.log(hobbies);

// // const copiedArray = hobbies.slice();
// const copiedArray = [...hobbies];
// console.log(copiedArray);

// const toArray = (...args) => {
// 	return args;
// };

// console.log(toArray(1, 2, 3, 4));
