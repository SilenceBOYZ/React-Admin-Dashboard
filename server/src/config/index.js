const { Sequelize } = require("sequelize");
require("dotenv").config();

const seqeuelize = new Sequelize(process.env.DATABASENAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.LOCALHOST,
    dialect: 'mysql'
});
async function connect() {
    try {
      await seqeuelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
module.exports = {
    connect: connect,
    seqeuelize: seqeuelize
};