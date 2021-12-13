'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(Messages, {foreignKey: 'customerID', as: 'messages', onDelete: 'cascade', hooks: true});
    }
  };
  Customer.init({
    name: { 
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    email: { 
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull : false,
    },
    adress:{
      type: DataTypes.STRING,
      allowNull : false,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull : false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull : false,
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['email']}
    },
    modelName: 'Customer',
  });
  return Customer;
};