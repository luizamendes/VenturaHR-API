const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Company = require("../models/Company");
const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const Application = require("../models/Application");

const connection = new Sequelize(dbConfig);

Company.init(connection);
Candidate.init(connection);
Job.init(connection);
Application.init(connection);

Company.associate(connection.models);
Candidate.associate(connection.models);
Job.associate(connection.models);
Application.associate(connection.models);

module.exports = connection;
