// //status: isIn: [[approved, deny, pending]]
// //user1     user2   status  sender
// //   1       2      false   1
// //   2       1      false   1


// //sender receiver  status 
// //   1       2      false   


// const Sequelize = require("sequelize");
// const db = require("../db");

// const Friendship = db.define("friendship", {
//   sender: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//         model: "user",
//         key: "id"
//     },
//   },
//   receiver: {
//     type: Sequelize.INTEGER,
//     references: {
//         model: "user",
//         key: "id"
//     }
//   },
//   status: {
//     type: Sequalize.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [["pending", "approved", "denied"]],
//     },
//   },

// });

// module.exports = Friendship;

// //User.hasMany(Friend)?



// // select * user1 = id status = true
//UNION
//Select



//Friendship.belongsTo(User, { as: 'info', foreignKey: 'friend' });
//User.belongsToMany(User, { as: 'friendship', through: Friendship, foreignKey: 'user', otherKey: 'friend' });


//addFreind 
//User.hasMany(Friendship, { as: 'friends', foreignKey: 'user' });

//
//union
//sender receiver
//1      3
//3      1