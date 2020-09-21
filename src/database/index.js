const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Company = require("../models/Company");
const Candidate = require("../models/Candidate");

const connection = new Sequelize(dbConfig);

Company.init(connection);
Candidate.init(connection);

module.exports = connection;
