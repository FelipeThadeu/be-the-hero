const crypto = require('crypto') //pacote para cryptografia que ja vem no node, mas tem um metodo que iremos usar para gerar uma string aleatória
const connection = require('../database/connection') //importandoo arquivo de conexão do banco de dados

module.exports = {
    async index(resquest, response) {
        const ongs = await connection('ongs').select('*')
        
        return response.json( ongs )
    },

    async create(request,response) {
        const { name, email, whatsapp, city, uf } = request.body

        const id = crypto.randomBytes(4).toString('HEX') //gera 4 bytes de caracteres hexadecimais

        await connection('ongs').insert({ // inseriondo as variáveis no banco
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}