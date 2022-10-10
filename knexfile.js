// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mssql',
    connection: {
      database: 'exodus_aula',
      server: 'srv-discovery',
      user: 'diego',
      password: 'bkf102030',
      port: 1433,
    }
  },

};
