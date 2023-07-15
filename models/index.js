// High level db config
// Set up a connection from our app to a specific db depending on the environment (dev or production)

// Import Sequelize libraries and then also the DataTypes Library
let { Sequelize, DataTypes } = require('sequelize');

// environment the app is running is locally (dev version) or production
// Environment variables are variables a computer stores and any computer can have access to those variables to run the app depending on a use case. Example, env variables can have both production and development settings that can be chosen, depending where the app is running from
let env = process.env.NODE_ENV || 'development'; // set a default if no environment variable

console.log('Using environment ' + env);

// read all config settings and files from our config.json file
let configFile = require(__dirname + '/../config.json');

let config = configFile[env]; // Allow env to read from config settings of either dev or production mode. We attach configFile with env to do so.

// Allow passwords to be stored inside as a environnement variable when running in production mode

let password = process.env.DB_PASSWORD; // Undefined locally (dev mode) not needed for sqlite

// But need a password in production mode (Azure)
config.password = password;

// db object to be exported to use on other files
let db = {};

// Our sequelize object data file from config.json
let sequelize = new Sequelize(config);

let studentModelCreate = require('./student'); // A function definition (From our student file that defines a student property) When we write 'require' we are bringing in files to use and in this case, student file contains an exported function that returns a defined student, but requires 2 arguments, Sequelize, DataTypes

// Call that function of the returned student
let studentModel = studentModelCreate(sequelize, DataTypes);

// We are associating our return student property with a db value
db[studentModel.name] = studentModel;

db.sequelize = sequelize; // sequelize configuration of our db

db.Sequelize = Sequelize; // Sequelize library

module.exports = db; // Package everything as a db object
