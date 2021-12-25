'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Categories, {foreignKey: 'categoryID', as: 'category'})
      this.belongsToMany(models.Orders,{ through: models.OrderProducts })
    }
  };
  Products.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: { 
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull : false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    quantityStock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};