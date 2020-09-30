const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Company = require("../models/Company");
const Candidate = require("../models/Candidate");
const Job = require("../models/Job");

const connection = new Sequelize(dbConfig);

Company.init(connection);
Candidate.init(connection);
Job.init(connection);

Job.associate(connection.models);

module.exports = connection;
