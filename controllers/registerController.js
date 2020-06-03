const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Libros = require('../models/libro')
const { KEY } = require('../key')


module.exports.getViewLogin = (req, res, next) => {
    res.status(200).render('register/login',{error: false});
}

module.exports.postLogin = (req, res, next) => {
    const {rut, clave} = req.body;

    Usuario.findByPk(rut)
        .then( usuario => {
            // if(!usuario){
            //     return res.status(404).json({msg:'Usuario no existe'})
            // }

            // if(!bcrypt.compareSync(clave, usuario)){
            //     return res.status(400).send({
            //         ok:false,
            //         message: "Credenciales Invalidas"
            //     })
            // }

            if(usuario && clave === usuario.clave){
                jwt.sign({usuario}, KEY,{expiresIn: '24h'}, (err,token) =>{
                    if(err){
                        console.log(err)
                        throw err;
                    }

                    Libros.findAll()
                        .then(libros=> {

                            req.session.token = token;

                            // res.cookie('access_token', token,{
                            //     maxAge: 3600,httpOnly: true
                            // })
                            return res.status(200).render(`biblioteca/biblioteca${usuario.tipoUsuario}`, {token, libros,login: true})
                        })
                })
            } else {
                return res.status(401).render('register/login',{error: true})
            }
        })
        .catch( err => {
            console.log(err)
            return res.status(505).json({ok: false, err})
        })

}

module.exports.postLogout = (req, res, next) => {
    delete req.session.token;
    return res.status(200).redirect('/');
}

module.exports.postNewUser = (req, res, next) => {
    const SALT_ROUNDS = 10;
    const {rut, clave, correo, fono, tipoUsuario, nombre, primerApellido, segundoApellido} = req.body;

    Usuario.findByPk(rut)
        .then( user => {
            if( !user.length ){
                return res.json({err:"Ya existe un usuario registrado con este correo", status: 301})
            }

            bcrypt.genSalt(SALT_ROUNDS,(err, salt) => {
                if(err){
                    throw err; 
                }
                bcrypt.hash(clave, salt, (err, passEncripted) => {
                    if(err){
                        throw err;
                    }


                    
                    Usuario.create({rut, passEncripted, correo, fono, tipoUsuario, nombre, primerApellido, segundoApellido})
                        .then((resdb) =>{
                            return res.send(resdb)
                        })
                        .catch( err => {
                            return res.send({err})
                        })
                })
            })

        })
        .catch( err => {
            return res.json(err)
        })
}

module.exports.getViewForgetPassword = (req, res, next) => {
    res.status(200).render('register/forgetPassword')
}

module.exports.postDataForgetPassword = (req, res, next) => {
    res.status(200).json({ok: true})
}