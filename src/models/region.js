'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Region.init({
    region_code : {
        type : DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    region_id : DataTypes.STRING,
    country_code : DataTypes.STRING,
    psgc_code : DataTypes.STRING,
    region_name : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};