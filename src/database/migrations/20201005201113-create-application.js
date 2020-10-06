"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Applications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      candidateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Candidates", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Jobs", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      answers: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      result: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Applications");
  },
};
