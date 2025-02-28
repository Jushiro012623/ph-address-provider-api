'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Regions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        region_code : {
            type : Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        region_id : Sequelize.STRING,
        psgc_code : Sequelize.STRING,
        region_name : Sequelize.STRING,
        country_code : Sequelize.STRING,
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Regions');
  }
};