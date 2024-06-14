'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('Carts', {
      fields: ['userId'],
      type: "foreign key",
      name: "user_cart_association",
      references: {
        table: 'Users',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('Carts', {
      fields: ['itemId'],
      type: "foreign key",
      name: "item_cart_association",
      references: {
        table: 'Items',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('Carts', 'user_cart_association');
    queryInterface.removeConstraint('Carts', 'item_cart_association');
    await queryInterface.dropTable('Carts');
  }
};