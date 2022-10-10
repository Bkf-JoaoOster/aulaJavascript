const jwt = require('jsonwebtoken');
const SECRET = 'PALAVRACHAVE';

module.exports = {
    signToken(req, res, next){
        return jwt.sign({userId: req}, SECRET, {expiresIn : 1400});
    },
    verifyJWT(req, res, next){
        const token = req.headers['x-access-token'];
        //verificar se token foi passado
        if(!token){
            res.json({
                status:'error',
                message : "Token não foi enviado na request"
            })
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    status:'error',
                    message : "Token não autorizado"
                })
            }

            req.userId = decoded.userId;
            next();
        })
    }
}
