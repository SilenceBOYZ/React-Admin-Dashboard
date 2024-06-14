'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodName: {
        type: Sequelize.STRING
      },
      foodPrice: {
        type: Sequelize.INTEGER
      },
      foodDesc: {
        type: Sequelize.TEXT
      },
      foodImage: {
        type: Sequelize.STRING
      },
      catergoryId: {
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint('Items', {
      fields: ['catergoryId'],
      type: "foreign key",
      name: "catergories_item_association",
      references: {
        table: 'Catergories',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};