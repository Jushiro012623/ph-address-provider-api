'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsToMany(models.Role, { 
            through: 'User_Role',
            foreignKey: 'user_id', 
            otherKey: 'role_id',
            onDelete: 'CASCADE',  
        });
    }
  }
  User.init({
    username: {
        type:DataTypes.STRING,
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};