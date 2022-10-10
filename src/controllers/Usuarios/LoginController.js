const knex = require('../../database');
const jwtConfig = require('../../jwtConfig');
const md5hash = require('md5');

module.exports = {
    async login(req, res, next){
        try {
            let user = await knex('dbo.Usuarios').where({
                usuario : req.body.usuario,
                senha: md5hash(req.body.senha)
            }).select();

            if(user.length > 0){
                const token = jwtConfig.signToken(user[0].id);

                return res.json({
                    auth : true,
                    token : token
                })
            } else{
                return res.json({
                    auth : false,
                    msg : "Usuário Inválido"
                })
            }
        } catch (error) {
            next(error)
        }
    }
}