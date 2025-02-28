'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barangay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barangay.init({
    region_code: DataTypes.STRING,
    province_code: DataTypes.STRING,
    city_code: DataTypes.STRING,
    brgy_code: DataTypes.STRING,
    brgy_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barangay',
  });
  return Barangay;
};