//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Bill = require('./models/Bill');

//associations could go here!

//Bills created by a User, the owner of the bill, to charge their friends
User.hasMany(Bill);
Bill.belongsTo(User);

//The Users who owe money to the respective owners of the Bills
Bill.belongsToMany(User, {as: 'owes', through: 'payee'});
User.belongsToMany(Bill, {as: 'owed', through: 'payee'});

//Users being friends with eachother
//when we want to switch to fb style friends, add pending field to friendship model
User.belongsToMany(User, {as: 'friend', through: 'friendship'});

module.exports = {
  db,
  models: {
    User, Bill
  },
};
