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
      //this.belongsTo(models.Orders, {foreignKey: 'orderID', as: 'orderedProducts'})
      //this.belongsTo(models.Products, {foreignKey: 'productID'})
      this.belongsTo(models.Users, {foreignKey: 'userId', as: 'user'});
    }
  };
  OrderProducts.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};