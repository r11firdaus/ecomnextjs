// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
        host: 'ec2-3-234-22-132.compute-1.amazonaws.com',
        user: 'uxffmfkaklwcjf',
        password: '1cd89e467753a7ee6c75f926615d03aa51f6a33430d8a45cb6138dc02e2ee91e',
        database: 'd6qj7n3mfqjn1d',
        ssl: true
    }
  },
  // development: {
  //   client: 'postgresql',
  //   connection: {
  //       host: '127.0.0.1',
  //       user: 'postgres',
  //       password: '',
  //       database: 'db_jwallin'
  //   }
  // },

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
