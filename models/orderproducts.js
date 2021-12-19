'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Orders, {foreignKey: 'orderID'})
      this.belongsTo(models.Products, {foreignKey: 'productID'})
    }
  };
  OrderProducts.init({
    orderID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};