module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Orders', 'address', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'phoneNumber', {
          type: Sequelize.DataTypes.STRING(12),
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'paymentMethod', {
          type: Sequelize.DataTypes.STRING(20),
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'address', { transaction: t }),
        queryInterface.removeColumn('Orders', 'phoneNumber', { transaction: t }),
        queryInterface.removeColumn('Orders', 'paymentMethod', { transaction: t })
      ]);
    });
  }
};