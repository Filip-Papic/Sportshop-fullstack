'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priceTotal: {
        type: DataTypes.FLOAT
      },
      quantityTotal: {
        type: DataTypes.INTEGER
      },
      details: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE,
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Orders');
  }
};