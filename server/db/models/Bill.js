const Sequelize = require("sequelize");
const db = require("../db");

const Bill = db.define("bill", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["simple", "complex"]],
    },
  },

  name: {
    type: Sequelize.STRING,
    defaultValue: "New Bill",
  },

  parsedBill: {
    type: Sequelize.TEXT,
    defaultValue: "{}",
    get: function () {
      return JSON.parse(this.getDataValue("parsedBill"));
    },
    set: function (val) {
      return this.setDataValue("parsedBill", JSON.stringify(val));
    },
  },

  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },

  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },

  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Bill;

