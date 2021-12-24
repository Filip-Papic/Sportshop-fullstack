'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Orders, {foreignKey: 'userID', as: 'orders', onDelete: 'cascade', hooks: true})
    }
  };
  Users.init({
    name: { 
      type : DataTypes.STRING,
      unique : true
    },
    email: { 
      type : DataTypes.STRING,
      unique : true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
    },
    admin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    moderator:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    adress:{
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    defaultScope: {
    },
    modelName: 'Users',
  });
  return Users;
};