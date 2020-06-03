const jwt = require('jsonwebtoken');

const { KEY } = require('../key');


module.exports.tokenValidator = (req, res, next) => {

    const token = req.session.token
    // const token = req.cookies.access_token;


    jwt.verify(token, KEY, (err, tokenData) => {
        if (err) {
            return res.status(200).render('register/login',{error: true})
        }

        res.cookie('access_token', token,{
            maxAge: 3600,httpOnly: true
        })

        req.usuario = tokenData.usuario;
        // console.log(req.usuario)
        next();

    })
}