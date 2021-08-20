const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
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
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.zeldadungeon.net/wiki/images/f/fc/Malon_%28Oracle_of_Seasons%29.png',
    validate: {
      isUrl: true,
    },
  },
});

module.exports = User;