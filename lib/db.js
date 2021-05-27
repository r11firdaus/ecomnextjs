const dbConfig = require('../knexfile');
const knex = require('knex');

let cachedConnection;

export const getDatabaseConnector = () => {
  if (cachedConnection) {
    console.log('Cached Connection');
    return cachedConnection;
  }
  const configByEnvironment = dbConfig[process.env.NODE_ENV || 'development'];

  if (!configByEnvironment) {
    throw new Error(`Failed to get knex config for env ${process.env.NODE_ENV}`);
  }
console.log('New Connection');
const connection = knex(configByEnvironment);
cachedConnection = connection;
return connection;
}

export default getDatabaseConnector;

// const knex = require('knex')({
//     client: process.env.DB_CLIENT,
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: process.env.DB_PORT,
//       // ssl: {rejectUnauthorized: false}
//     }
//   });

  // export default knex;