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
    type: Sequelize.BIGINT,
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
      "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg",
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
  color: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    //"#2b2a2a" dark bg
 
    defaultValue: ["#ED3B5B","#3bedac","white","pink"]
  }
});

module.exports = User;
