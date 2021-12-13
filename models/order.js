'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    name: { 
      type : DataTypes.STRING,
    },
    priceTotal: {
      type: DataTypes.FLOAT,
    },
    quantityTotal:{
      type: DataTypes.INTEGER,
    },
    details:{
      type: DataTypes.STRING,
    },
    date:{
      type: DataTypes.DATE,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};