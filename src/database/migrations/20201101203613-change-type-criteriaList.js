"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Jobs", "criteriaList", {
      type: Sequelize.STRING(1000),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Jobs", "criteriaList", {
      type: Sequelize.STRING,
    });
  },
};
