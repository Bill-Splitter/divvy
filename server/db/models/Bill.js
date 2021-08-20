const Sequelize = require('sequelize');
const db = require('../db');

const Bill = db.define('bill', {
  parsedBill: {
    type: Sequelize.TEXT,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Bill;