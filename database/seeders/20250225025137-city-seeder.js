'use strict';

const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cities = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/philippines/city.json'), 'utf8'))
    return await queryInterface.bulkInsert('Cities', cities.map(city => ({
        region_code : city.region_desc.toUpperCase(),
        province_code : city.province_code.toUpperCase(),
        city_code : city.city_code.toUpperCase(),
        psgc_code : city.psgc_code.toUpperCase(),
        city_name : city.city_name.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date()
    })),{});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
