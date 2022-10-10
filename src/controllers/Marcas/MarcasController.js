const knex = require('../../database');
const table = 'Tab_DIM_Marca';

module.exports = {
    async index(req, res, next){
        const results = await knex(table);

        return res.json(results);
    },
    async create(req, res, next){
        try {

            const isExist = await knex(table).where({"Marca" : req.body.Marca})

            if(isExist.length > 0){

                 return res.status(201).send({
                    'status' : 'error',
                    'message' : 'Esse registro já existe'
                }) 
            }else{

                if(await knex(table).insert(req.body)){
    
                    return res.status(201).send({
                        'status' : 'success',
                        'message' : 'Inserido com sucesso'
                    })
                }else{
                    
                    return res.status(201).send({
                        'status' : 'error',
                        'message' : 'Não foi possível inserir o registro, verifique os parametros'
                    })
                }
            }
            

        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next){

    },
    async delete(req, res, next){

    }
}