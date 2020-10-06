const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const connection = new Sequelize(dbConfig);

User.init(connection);
Job.init(connection);
Application.init(connection);

User.associate(connection.models);
Job.associate(connection.models);
Application.associate(connection.models);

module.exports = connection;
