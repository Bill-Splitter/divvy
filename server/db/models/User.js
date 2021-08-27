const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
  },
  password: {
    type: Sequelize.STRING,
  },
  fName: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.zeldadungeon.net/wiki/images/f/fc/Malon_%28Oracle_of_Seasons%29.png",
    validate: {
      isUrl: true,
    },
  },
  groups: {
    type: Sequelize.TEXT,
    defaultValue: "[]",
    get: function () {
      return JSON.parse(this.getDataValue("groups"));
    },
    set: function (val) {
      return this.setDataValue("groups", JSON.stringify(val));
    },
  },
});

module.exports = User;
