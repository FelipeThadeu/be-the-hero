const connection = require('../database/connection') //importandoo arquivo de conexão do banco de dados

module.exports = {
    async index(request, response){ //método de listagem de casos da Ong
        const { page = 1 } = request.query //paginação

        const [ count ] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ])

        response.header('X-Total-Count', count['count(*)']) //mostra a quantidade de itens no header

        return response.json( incidents )
    },

    async create(request, response) { //método de criação de casos da Ong
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization //informação da ong que está logada

        const [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })

    },

    async delete(request,response){ //método delete casos da Ong
        const { id } = request.params 
        const ong_id = request.headers.authorization 

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'})
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}