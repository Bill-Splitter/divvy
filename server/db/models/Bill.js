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
  
  image: {
    type: Sequelize.TEXT,
    length: "long",
    defaultValue:
      "https://www.pngarea.com/pngm/534/7779866_ace-cash-express-receipt-png-download-check-free.png",
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

