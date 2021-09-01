const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');

//seeding
const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`It's dangerous to go alone... take this: port ${PORT}!`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
