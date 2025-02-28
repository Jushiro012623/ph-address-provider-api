'use strict';

const fs = require('fs')
const path = require('path')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const countries = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/country.json'), 'utf8'))

    await queryInterface.bulkInsert('Countries', countries.map(country => ({
        country_code : country.alpha_2_code.toUpperCase(),
        country_number : country.num_code.toUpperCase(),
        name : country.en_short_name.toUpperCase(),
        nationality : country.nationality.toUpperCase(),
        country_alpha : country.alpha_3_code.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date()
    })),{});
    
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
