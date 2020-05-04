const knex = require('knex') // pacote de conexão com bancos SQL
const configuration = require('../../knexfile') // importando as configurações de conexão ao banco

const connection = knex(configuration.development)

module.exports = connection //exportando a conexão do banco