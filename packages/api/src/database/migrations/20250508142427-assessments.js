'use strict';
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`assessments`, {
      altercationsWithCats: {
        type: Sequelize.INTEGER,
      },
      altercationsWithOwner: {
        type: Sequelize.INTEGER,
      },
      catDob: {
        type: Sequelize.DATE,
      },
      catName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn(`NOW`),
        type: Sequelize.DATE,
      },
      hissesAtStrangers: {
        type: Sequelize.INTEGER,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      instrumentType: {
        type: Sequelize.STRING,
      },
      playsWellWithDogs: {
        type: Sequelize.INTEGER,
      },
      previousContact: {
        type: Sequelize.INTEGER,
      },
      riskLevel: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn(`NOW`),
        type: Sequelize.DATE,
      },
    });
  },
};
