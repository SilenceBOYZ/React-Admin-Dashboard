'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catergories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
 
    }
  }
  Catergories.init({
    catergoryName: DataTypes.STRING,
    catergoryDesc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Catergories',
  });
  return Catergories;
};