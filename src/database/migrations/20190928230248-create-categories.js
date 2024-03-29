'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('categories');
  },
};
