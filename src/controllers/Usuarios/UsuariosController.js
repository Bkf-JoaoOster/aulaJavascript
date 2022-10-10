const knex = require('../../database');
const table = 'dbo.Usuarios';
const md5hash = require('md5');
const cpfFormat = require('cpf');

const cpfDesformat = function (cpf) {
    cpf = cpf.replaceAll('.', '');
    cpf = cpf.replaceAll('-', '');
    return cpf;
}

module.exports = {
    async index(req, res, next) {

        const results = await knex(table);

        const resultSet = [];

        for (const key in results) {
            resultSet.push({
                "id": results[key].id,
                "nome": results[key].nome,
                "usuario": results[key].usuario,
                "cpf": cpfFormat.format(results[key].cpf)
            })

        }

        return res.json(resultSet);

    },
    async create(req, res, next) {

        try {

            //verificar se usuário existe
            const isExistis = await knex(table).where({
                usuario: req.body.usuario
            });
            if (isExistis.length > 0) {
                return res.json({
                    'status': 'error',
                    'message': 'Este usuário já existe'
                })
            }
            //gerar senha em sha

            const qry = await knex(table).insert({
                'nome': req.body.nome,
                'usuario': req.body.usuario,
                'senha': md5hash(req.body.senha),
                'cpf': cpfDesformat(req.body.cpf)
            })

            if (qry) {
                return res.json({
                    'status': 'success',
                    'message': 'Registro inserido com sucesso'
                })
            } else {
                return res.json({
                    'status': 'error',
                    'message': 'Registro não inserido'
                })
            }

        } catch (error) {
            next(error)
        }


    },
    async update(req, res, next) {

        try {

            const qry = await knex(table).where(req.params).update(req.body)

            if (qry) {
                return res.json({
                    'status': 'success',
                    'message': 'Registro editado com sucesso'
                })
            } else {
                return res.json({
                    'status': 'error',
                    'message': 'Registro não editado'
                })
            }

        } catch (error) {
            next(error)
        }



    },
    async delete(req, res, next) {
        try {
            const qry = await knex(table).where(req.params).delete();
            if (qry) {
                if (qry) {
                    return res.json({
                        'status': 'success',
                        'message': 'Registro deletado com sucesso'
                    })
                } else {
                    return res.json({
                        'status': 'error',
                        'message': 'Registro não deletado'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }
}