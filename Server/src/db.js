const { Sequelize, DataTypes } = require("sequelize");

const fs = require("fs");
const path = require("path");

//Requerimos dotenv
require("dotenv").config();

//Obtenemos las variables del env
const { DB_INT, DB_USER, DB_PASSWORD, DB_HOST, DEV} = process.env;

let dbbase = DB_INT;
if (DEV && DEV === "development") {
	dbbase = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/comics`;
}

const sequelize = new Sequelize(dbbase, {
	logging: false,
	native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);

//extraemos los modelos
sequelize.models = Object.fromEntries(capsEntries);

// Relaciones

const { Comic, User, Purchase, Review, Favorite, Category, Token } = sequelize.models;


// Relación User - Review
User.hasMany(Review);
Review.belongsTo(User);

// Relación Comic - Review
Comic.hasMany(Review);
Review.belongsTo(Comic);

// Relación User - Purchase
User.hasMany(Purchase);
Purchase.belongsTo(User);

// Relación Comic - Purchase
Comic.hasMany(Purchase);
Purchase.belongsTo(Comic);

// Relación Comic - Favorite
User.belongsToMany(Comic, { through: Favorite });
Comic.belongsToMany(User, { through: Favorite });

Comic.belongsToMany(Category, { through: 'ComicCategory' });
Category.belongsToMany(Comic, { through: 'ComicCategory' });

// Relación User - Token
User.hasMany(Token, { foreignKey: 'email' });
Token.belongsTo(User, { foreignKey: 'email' });

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
