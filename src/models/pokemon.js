const validTypes = [
	'Plante',
	'Poison',
	'Feu',
	'Eau',
	'Insecte',
	'Vol',
	'Normal',
	'Electrik',
	'Fée',
];
export default (sequelize, DataTypes) => {
	return sequelize.define(
		'pokemon',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { msg: 'le nom du pokémon doit être unique.' },
				validate: {
					notEmpty: { msg: 'Le nom du pokémon ne peut pas être vide.' },
					notNull: { msg: 'Le nom du pokémon est une propriété requise.' },
				},
			},
			hp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						msg: 'Utilisez uniquement des nombres entiers pour les points de vie.',
					},
					min: {
						args: [0],
						msg: 'Les points de vie doivent être supérieurs ou égaux à 0.',
					},
					max: {
						args: [999],
						msg: 'Les points de vie doivent être inférieurs ou égaux à 999.',
					},
					notNull: { msg: 'les points de vie sont une propriété requise.' },
				},
			},
			cp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						msg: 'Utilisez uniquement des nombres entiers pour les points de combat.',
					},
					min: {
						args: [0],
						msg: 'Les points de combat doivent être supérieurs ou égaux à 0.',
					},
					max: {
						args: [99],
						msg: 'Les points de combat doivent être inférieurs ou égaux à 9999.',
					},
					notNull: { msg: 'les points de combat sont une propriété requise.' },
				},
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: { msg: "L'URL de l'image doit être valide." },
					notNull: { msg: "L'image est une propriété requise." },
				},
			},
			types: {
				type: DataTypes.STRING,
				allowNull: false,
				get() {
					return this.getDataValue('types').split(',');
				},
				set(types) {
					this.setDataValue('types', types.join(','));
				},
				validate: {
					isTypesValid(value) {
						if (!value) {
							throw new Error('Un pokémon doit avoir au moins un type.');
						}
						if (value.split(',').length > 3) {
							throw new Error('Un pokémon ne peut pas avoir plus de 3 types.');
						}
						value.split(',').forEach((type) => {
							if (!validTypes.includes(type)) {
								throw new Error(
									`le type de pokémon doit appartenir à la liste suivante:${validTypes}`
								);
							}
						});
					},
				},
			},
		},
		{
			timestamps: true,
			createdAt: 'created',
			updatedAt: false,
		}
	);
};
// const data = 'New York;10.99;2000';
// const tranformData = data.split(';');
// // tranformData[1] = +tranformData[1];
// console.log(tranformData);

// const namefragment = ["Del'or", 'Mutaliko'];
// const fullName = namefragment.join(' ');
// console.log(fullName);
