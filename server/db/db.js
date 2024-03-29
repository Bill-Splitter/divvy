const Sequelize = require('sequelize')
const pkg = require('../../package.json')

//my heroku db name couldnt be 'divvy', so I made it 'divvydb'. hence the logic below.
const databaseName = pkg.name + (process.env.DATABASE_URL ? 'db' : '') + (process.env.NODE_ENV === 'test' ? '-test' : '');
console.log('databaseName: ', databaseName);

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
module.exports = db
