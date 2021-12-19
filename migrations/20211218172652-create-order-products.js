'use strict';
module.exports = {
  up: async (queryInterface, DataType) => {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      orderID: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      productID: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      quantity: {
        type: DataType.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE
      }
    });
  },
  down: async (queryInterface, DataType) => {
    await queryInterface.dropTable('OrderProducts');
  }
};