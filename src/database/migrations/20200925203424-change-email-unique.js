"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Companies", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn("Candidates", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Companies", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });

    await queryInterface.changeColumn("Candidates", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
