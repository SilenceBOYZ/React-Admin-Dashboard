'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    await queryInterface.addConstraint('RolePermissions', {
      fields: ['roleId'],
      type: "foreign key",
      name: "role_permission_association",
      references: {
        table: 'Roles',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('RolePermissions', {
      fields: ['permissionId'],
      type: "foreign key",
      name: "role_Permissions_association",
      references: {
        table: 'Permissions',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions');
  }
};