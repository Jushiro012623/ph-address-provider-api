'use strict';

const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const provinces = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/philippines/province.json'), 'utf8'))

    return await queryInterface.bulkInsert('Provinces', provinces.map(province => ({
        region_code : province.region_code.toUpperCase(),
        province_code : province.province_code.toUpperCase(),
        psgc_code : province.psgc_code.toUpperCase(),
        province_name : province.province_name.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date()
    })),{});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provinces', null, {});
  }
};
