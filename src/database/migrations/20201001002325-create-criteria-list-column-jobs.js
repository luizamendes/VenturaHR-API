"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Jobs", "criteriaList", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Jobs", "criteriaList");
  },
};
