'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdersItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unitPrice: {
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      totalPrice: {
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('OrdersItems', {
      fields: ['orderId'],
      type: "foreign key",
      name: "orders_ordersItems_association",
      references: {
        table: 'Orders',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('OrdersItems', {
      fields: ['itemId'],
      type: "foreign key",
      name: "items_ordersItems_association",
      references: {
        table: 'Items',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("OrdersItems", "orders_ordersItems_association")
    await queryInterface.removeConstraint("OrdersItems", "items_ordersItems_association")
    await queryInterface.dropTable('OrdersItems');
  }
};