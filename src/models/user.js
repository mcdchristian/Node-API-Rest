export default (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: { msg: 'le nom est déjà pris' },
		},
		password: {
			type: DataTypes.STRING,
		},
	});
};

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
