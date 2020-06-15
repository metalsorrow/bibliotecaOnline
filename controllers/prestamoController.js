const Usuario = require('../models/usuario');
const Libro = require('../models/libro');
const Prestamo = require('../models/prestamo');

const getPrestamosUsuario = (req, res) => {
    const usuario = req.usuario;

    Usuario.findByPk(usuario.rut)
        .then(usuario => {
            return usuario.getLibros()
        })
        .then( prestamos => {
            return res.status(200).render('prestamo/prestamos',{prestamos})
        })
        .catch(err => {
            return res.status(505).json({ok: false, err})
        })

}


const postNewPrestamo = (req,res) => {
    const {idLibro} = req.params;
    const usuario = req.usuario;

    
    Libro.findByPk(idLibro)
        .then( libro => {
            Usuario.findByPk(usuario.rut)
                .then( usuario => {
                    return usuario.addLibro(libro)
                })
                .then( resDB => {
                    return res.status(200).redirect(`/prestamo/`);
                })
                .catch( err => {
                    return res.status(505).json({ok: false, err})
                })
        })
        .catch( err => {
            return res.status(505).json({ok: false, msg:'Error searching books', err})
        })
}


module.exports = {
    postNewPrestamo,
    getPrestamosUsuario
}