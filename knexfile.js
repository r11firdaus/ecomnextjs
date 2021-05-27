// Update with your config settings.

module.exports = {

  production: {
    client: 'postgresql',
    connection: {
        host: 'ec2-3-234-22-132.compute-1.amazonaws.com',
        user: 'uxffmfkaklwcjf',
        password: '1cd89e467753a7ee6c75f926615d03aa51f6a33430d8a45cb6138dc02e2ee91e',
        database: 'd6qj7n3mfqjn1d',
        ssl: {rejectUnauthorized: false}
    }
  },
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    }
  },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

};
