'use strict';

module.exports = {
  async down(queryInterface) {
    await queryInterface.dropTable(`assessments`);
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`assessments`, {
      cat_date_of_birth: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cat_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      instrument_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      risk_level: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
        type: Sequelize.DATE,
      },
    });
  },
};
