"use strict";

const {
  db,
  models: { User, Bill, FriendRequest },
} = require("./server/db");

const group = [
  {
    groupname: "three amigos",
    users: [2, 3],
  },
  {
    groupname: "wednesday bowling",
    users: [2, 3],
  },
];

const group2 = [
  {
    groupname: "three losers",
    users: [1, 3, 4],
  },
  {
    groupname: "wednesday beer run",
    users: [3, 5],
  },
];

//declaring user objects
const userSeed = [
  {
    username: "Jack",
    email: "jack@gmail.com",
    phoneNumber: 1112223434,
    password: "123",
    imageUrl:
      "https://th.bing.com/th/id/R.7bc747bc2278a33b20ca592f4c6773eb?rik=uWa5RA7F%2brc29w&riu=http%3a%2f%2fdanielsschleswigholstein.weebly.com%2fuploads%2f2%2f4%2f4%2f0%2f24400987%2f1394821057.jpg&ehk=J0QxdVW5cnjMgMrc9yR14LXUfOnuaOzkchaoASL%2b7Js%3d&risl=&pid=ImgRaw&r=0",
    groups: group,
    fName: "Jack",
    lName: "Smith",
  },
  {
    username: "Jim",
    email: "jim@gmail.com",
    phoneNumber: 2149240432,
    password: "123",
    groups: group2,
    fName: "Jim",
    lName: "Jones",
    imageUrl:
      "https://travelslebanon.weebly.com/uploads/2/7/1/6/27166575/786855_orig.jpg",
  },
  {
    username: "Julian",
    email: "julian@gmail.com",
    phoneNumber: 4939403893,
    password: "123",
    fName: "Julian",
    lName: "Peters",
    imageUrl:
      "https://th.bing.com/th/id/OIP.7pEKHF7s05ogjhzX6kUxzwAAAA?pid=ImgDet&rs=1",
  },
  {
    username: "James",
    email: "james@gmail.com",
    phoneNumber: 5843943849,
    password: "123",
    fName: "James",
    lName: "Jackson",
    imageUrl:
      "https://th.bing.com/th/id/R.d086dca0688ecd76bc87477651bea788?rik=53VIR39yloJtYA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-A8wwRNzRrwU%2fT5XToa5wK1I%2fAAAAAAAAAG0%2fQeO01dNSsOk%2fs1600%2fcatalburun.jpg&ehk=cZo8TB5ZaoxBrTMafubUHUrVTroRlNxEGwUxedUmQJk%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    username: "Jermey",
    email: "jermey@gmail.com",
    phoneNumber: 5890948944,
    password: "123",
    fName: "Jeremy",
    lName: "White",
    imageUrl:
      "https://th.bing.com/th/id/OIP.OVSB9k-OAK5BBj93v233sgAAAA?pid=ImgDet&rs=1",
  },
  {
    username: "Jacky",
    email: "jacky@gmail.com",
    phoneNumber: 6904858434,
    password: "123",
    fName: "Jacky",
    lName: "Robinson",
    imageUrl:
      "https://th.bing.com/th/id/OIP.ht9AD3ZVrDz8z1PTuwYYjgC1Es?pid=ImgDet&rs=1",
  },
  {
    username: "Cameron",
    email: "cam@yahoo.com",
    phoneNumber: 6908958434,
    password: "123",
    fName: "Cameron",
    lName: "Biggs",
    imageUrl:
      "https://ae01.alicdn.com/kf/HTB1amXSbyrxK1RkHFCcq6AQCVXae/REPTAR-ON-SLICE-enamel-pin.jpg_Q90.jpg_.webp",
  },
  {
    username: "Josh",
    email: "jhar@hotmail.com",
    phoneNumber: 6904858904,
    password: "123",
    fName: "Josh",
    lName: "Harp",
    imageUrl:
      "https://patriotswire.usatoday.com/wp-content/uploads/sites/71/2021/08/1234768747.jpg?w=1000&h=600&crop=1",
  },
  {
    username: "Jordan",
    email: "jmiller@gmail.com",
    phoneNumber: 6904858434,
    password: "123",
    fName: "Jordan",
    lName: "Miller",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/220px-Sushi_platter.jpg",
  },
  {
    username: "Sarah",
    email: "sact@harvard.edu",
    phoneNumber: 6904858434,
    password: "123",
    fName: "Sarah",
    lName: "Ash",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMGZhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  },
  {
    username: "Doug",
    email: "dput@googlemail.com",
    phoneNumber: 1004858494,
    password: "123",
    fName: "Doug",
    lName: "Putnam",
    imageUrl:
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFpcnklMjBjb3d8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  },
  {
    username: "MarvelSucks",
    email: "bigT@yahoo.com",
    phoneNumber: 9004858434,
    password: "123",
    fName: "Thomas",
    lName: "Norris",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/tA1LUTjBih3StgEumRgpY5flSps=/0x0:1700x960/1400x933/filters:focal(714x344:986x616):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/57514059/mario.0.jpg",
  },
];

//declaring bill objects
const billSeed = [
  {
    total: 60,
    name: "Dinner with friends",
    type: "simple",
    completed: true,
    date: "2021-08-24T16:00:36.209Z",
    parsedBill: {
      title: "Fun",
      total: 60,
      group: "three amigos",
      userAmounts: "20",
    },
  },
  {
    total: 100,
    type: "complex",
    date: "2021-08-25T16:00:36.209Z",
    completed: false,
    name: "date with bff",
    parsedBill: {
      title: "Fun",
      total: 100,
      group: "three amigos",
      userAmounts: "33",
    },
  },
  {
    total: 90,
    type: "complex",
    date: "2021-08-27T16:00:36.209Z",
    completed: true,
    name: "date with gf",
    parsedBill: {
      title: "Fun",
      total: 90,
      group: "three amigos",
      userAmounts: "30",
    },
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

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
  await users[0].addFriend([
    users[1],
    users[2],
    users[3],
    users[4],
    users[5],
    users[11],
    users[10],
    users[9],
    users[8],
    users[7],
    users[6],
  ]);
  await users[1].addFriend([
    users[0],
    users[2],
    users[3],
    users[4],
    users[5],
    users[11],
    users[10],
    users[9],
    users[8],
    users[7],
    users[6],
  ]);
  await users[2].addFriend([
    users[1],
    users[0],
    users[3],
    users[4],
    users[5],
    users[11],
    users[10],
    users[9],
    users[8],
    users[7],
    users[6],
  ]);

  await users[3].addFriend([users[4],users[2],users[1],users[0]]);
  await users[4].addFriend([users[3],users[2],users[1],users[0]]);
  await users[5].addFriend([users[2],users[1],users[0]])
  await users[6].addFriend([users[2],users[1],users[0]])
  await users[7].addFriend([users[2],users[1],users[0]])
  await users[8].addFriend([users[2],users[1],users[0]])
  await users[9].addFriend([users[2],users[1],users[0]])
  await users[10].addFriend([users[2],users[1],users[0]])
  await users[11].addFriend([users[2],users[1],users[0]])
  console.log(`set friends between users successfully`);

  //CREATING FRIEND GROUPS
  //added jim & julian to jack's friendGroup
  // await users[0].addFriendGroup([users[1], users[2]]);
  //console.log(`created friend users' friend groups successfully`);

  //CREATING PENDING FRIEND REQUESTS
  //jacky has friend requests from Jeremy & James

  await users[5].addRequestee([
    users[11],
    users[10],
    users[9],
    users[8],
    users[6],
    users[7],
    users[4],
    users[3],
  ]);
  console.log("set pending friend requests successfully");

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
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
