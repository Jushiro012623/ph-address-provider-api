'use strict';

const fs = require('fs')
const path = require('path')
const { Barangay } = require('../../src/models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        
      const barangays = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/philippines/barangay.json'), 'utf8'));

      const batchSize = 10000;
      const totalBatches = Math.ceil(barangays.length / batchSize);
  
      for (let i = 0; i < totalBatches; i++) {
        const batchData = barangays.slice(i * batchSize, (i + 1) * batchSize);
        const uppercaseBatchData = batchData.map(barangay => ({
            ...barangay, 
            brgy_code: barangay.brgy_code ? barangay.brgy_code.toUpperCase() : barangay.brgy_code,
            brgy_name: barangay.brgy_name ? barangay.brgy_name.toUpperCase() : barangay.brgy_name,
            city_code: barangay.city_code ? barangay.city_code.toUpperCase() : barangay.city_code,
            province_code: barangay.province_code ? barangay.province_code.toUpperCase() : barangay.province_code,
            region_code: barangay.region_code ? barangay.region_code.toUpperCase() : barangay.region_code,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('Barangays', uppercaseBatchData, {
            validate: false,
            returning: false, 
          });
      }
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Barangays', null, {});
    }
};
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     const barangays = await JSON.parse(fs.readFileSync(path.join(__dirname, '../data/barangay.json'), 'utf8'))
//     console.log('barangay fetched')

//     const brgy = barangays.map(({region_code, province_code, city_code,brgy_code, brgy_name}) => ({
//         region_code,
//         province_code,
//         city_code,
//         brgy_code,
//         brgy_name : brgy_name.toUpperCase(),
//         createdAt: new Date(),
//         updatedAt: new Date()
//     }))

//     await queryInterface.bulkInsert('Barangays', brgy);
//     // await queryInterface.bulkInsert('Barangays', barangays.map(barangay => ({
//     //     region_code : barangay.region_code.toUpperCase(),
//     //     province_code : barangay.province_code.toUpperCase(),
//     //     city_code : barangay.city_code.toUpperCase(),
//     //     brgy_code : barangay.brgy_code.toUpperCase(),
//     //     brgy_name : barangay.brgy_name.toUpperCase(),
//     // })),{});
//   },
//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Barangays', null, {});
//   }
// };
