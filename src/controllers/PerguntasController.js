const knex = require('../database');


module.exports = {
    async index(req, res){
        const results = await knex('questoes').modify(function(qry){
            //filtro por id
            if(req.params.id){
                qry.where({'id' : req.params.id});
            }
            
            //filtro like pela pergunta
            if(req.body.pergunta){
                qry.whereLike('pergunta', `%${req.body.pergunta}%`)
            }

            //filtro like pelo fluxo
            if(req.body.fluxo){
                qry.whereLike('fluxo', `%${req.body.fluxo}%`)
            }

            
        }); 
        
        return res.json(results)
    },
    async create(req, res, next){

        try {
            /* await knex('questoes').insert({ 
                'pergunta' : req.body.pergunta,
                'fluxo' : req.body.fluxo,
                'id_setor_veiculo' : req.body.id_setor_fluxo
            }); */

            await knex('questoes').insert(req.body);
    
            return res.status(201).send({
                'status' : 'success',
                'message' : 'Inserido com sucesso'
            })
            
        } catch (error) {
            next(error)
        }

    },
    async update(req, res, next){
        try {
            await knex('questoes').update({
                'pergunta' : req.body.pergunta,
                'fluxo' : req.body.fluxo,
                'id_setor_veiculo' : req.body.id_setor_fluxo
            }).where(req.params)

            return res.status(201).send({
                'status' : 'success',
                'message' : 'Editado com sucesso'
            })

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try {
            await knex('questoes').where(req.params).del();

            return res.status(201).send({
                'status' : 'success',
                'message' : 'Deletado com sucesso'
            })
        } catch (error) {
            next(error)
        }
    }
}