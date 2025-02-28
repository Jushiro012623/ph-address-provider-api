'use strict';

const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const regions = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/philippines/region.json'), 'utf8'))

    return await queryInterface.bulkInsert('Regions', regions.map(region => ({
        region_code : region.region_code.toUpperCase(),
        region_id : region.id,
        psgc_code : region.psgc_code.toUpperCase(),
        region_name : region.region_name.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date()
    })),{});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Regions', null, {});
  }
};
