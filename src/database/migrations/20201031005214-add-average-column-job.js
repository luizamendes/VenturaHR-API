"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Jobs", "average", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Jobs", "average");
  },
};
