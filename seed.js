'use strict';

const {
  db,
  models: { User, Bill, FriendRequest },
} = require('./server/db');

//declaring user objects
const userSeed = [{
  username: 'Jack',
  email: 'jack@gmail.com',
  phoneNumber: 2,
  password: '123',
},{
  username: 'Jim',
  email: 'jim@gmail.com',
  phoneNumber: 2,
  password: '123',
},{
  username: 'Julian',
  email: 'julian@gmail.com',
  phoneNumber: 2,
  password: '123',
},{
  username: 'James',
  email: 'james@gmail.com',
  phoneNumber: 2,
  password: '123',
},{
  username: 'Jermey',
  email: 'jermey@gmail.com',
  phoneNumber: 2,
  password: '123',
},{
  username: 'Jacky',
  email: 'jacky@gmail.com',
  phoneNumber: 2,
  password: '123',
},];

//declaring bill objects
const billSeed = [
  { total: 432.00, name: "Dinner with friends", type: "simple", completed: true},
  { total: 324.49, type: 'complex', completed: false, name: "date with bff"},
  { total: 3294.49, type: 'complex', completed: true, name: "date with gf"},
];


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all(
    userSeed.map((user) => {
      return User.create(user);
    })
  );
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Bills
  const bills = await Promise.all(
    billSeed.map((bill) => {
      return Bill.create(bill);
    })
  );
  console.log(`seeded ${bills.length} bills`);
  console.log(`seeded successfully`);
  

  //ADDING FRIENDS
  //jack is friends w jim & julian
  await users[0].addFriend([users[1], users[2]]);
  await users[1].addFriend(users[0]); //jim.friend(jack)
  await users[2].addFriend(users[0]); //julian.friend(jack)

  //james is friends w jeremy
  await users[3].addFriend(users[4]);
  await users[4].addFriend(users[3]);
  console.log(`set friends between users successfully`);


  //CREATING FRIEND GROUPS
  //added jim & julian to jack's friendGroup
  await users[0].addFriendGroup([users[1], users[2]]);
  console.log(`created friend users' friend groups successfully`);


  //CREATING PENDING FRIEND REQUESTS
  //jacky has friend requests from Jeremy & James
  await users[5].addRequestee([users[4], users[3], users[2], users[1], users[0]]);
  console.log('set pending friend requests successfully');
  

  //SETTING OWNERS OF BILLS
  //setting jack as the owner of bill 0 & 1
  await bills[0].setUser(users[0]); //dinner w friends
  await bills[1].setUser(users[0]); //date w bff

  //setting jermey as owner of bill 2
  await bills[2].setUser(users[4]); //date w gf
  console.log(`set owners of bills successfully`);
  
  //setting users who owe money/payees of the bills (WIP)
  //await bills[1].addOwes([users[1], users[2]]);
  //console.log(`set payees of bills successfully`);

  // formatted like the existing values in statement was originally
  // i.e. attribute: value => product.name: product
  // then it is all returned as a single object, products.
  let userArrayToObj = {};
  users.forEach((user) => {
    userArrayToObj[user.name] = user;
  });

  return {
    users: userArrayToObj,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
