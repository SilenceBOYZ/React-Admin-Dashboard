'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Orders.init({
    userId: DataTypes.INTEGER,
    foodPrice: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    orderDate: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};