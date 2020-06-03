const Usuario = require('../models/usuario');

const getBibliotecaAdmin = (req,res) => {
    // console.log(req.cookies);
    return res.status(200).render('biblioteca/bibliotecaAdmin.ejs')
}

const getViewAdminUser = (req,res) => {
    return res.status(200).render('register/adminAddUserForm',{msg: false})
}

const postNewUser = (req,res) => {
    console.log(req.body)
    const {rut, clave, correo, fono, tipoUsuario, nombre, primerApellido, segundoApellido} = req.body;
    
    Usuario.findByPk(rut)
        .then( usuarioDB => {
            if(usuarioDB){
                return res.status(401).render('register/adminAddUserForm',{msg:true, text: 'Usuario ya existe', danger: true })
            }

            Usuario.create({rut, clave, correo, fono, tipoUsuario, nombre, primerApellido, segundoApellido})
                .then( (resDB) => {
                    return res.status(200).render('register/adminAddUserForm',{msg: true, text: `Usuario ${rut} Creado Satisfactoriamente!`, danger: false})
                })
                .catch( err => {
                    return res.status(505).json({ok: false, err})
                })
        })
        .catch( err => {
            res.status(505).json({ok: false, err})
        })
}


module.exports = {
    getViewAdminUser,
    postNewUser,
    getBibliotecaAdmin
}