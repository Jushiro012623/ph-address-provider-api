'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Country.init({
    country_code : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    country_number : DataTypes.STRING,
    name : DataTypes.STRING,
    nationality : DataTypes.STRING,
    country_alpha : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};