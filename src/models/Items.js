'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Items.belongsTo(models.Catergories);
      // models.Catergories.hasMany(Items);
    }
  }
  Items.init({
    foodName: DataTypes.STRING,
    foodPrice: DataTypes.INTEGER,
    foodDesc: DataTypes.STRING,
    foodImage: DataTypes.STRING,
    catergoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};