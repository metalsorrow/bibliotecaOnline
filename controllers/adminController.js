const Usuario = require('../models/usuario');
const Libro = require('../models/libro');
const Categoria = require('../models/categoria');
const {ROOT} = require('../utils/rootFile');
const fs = require('fs');

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


// Admin Libros

const viewAdminLibro = (req,res) => {
    Libro.findAll()
    .then( libros => {
        return res.status(200).render('admin/adminLibro',{libros, msg: false} )
    })
    .catch( err =>{
        res.status(505).json({ok: false, err}) 
    })
}

const viewAdminLibroForm =  (req, res) => {

    const {idLibro} = req.query
    Categoria.findAll()
    .then( categorias => {
        if(idLibro){
            Libro.findByPk(idLibro)
            .then(   libro => {
                return res.status(200).render('admin/adminLibroForm',{libro,categorias, msg: false, update: true } )
            })
            .catch( err =>{
                res.status(505).json({msg: 'error searching book', err}) 
            })
        } else {
            return res.status(200).render('admin/adminLibroForm',{categorias,msg: false, update: false} )
        }
    })
    .catch( err => {
        res.status(505).json({msg: 'error searching categories', err}) 
    })
}

const deleteLibro = async (req,res) => {
    const {idLibro} = req.params;
    try {
        
        const libro = await Libro.findByPk(idLibro)
        fs.unlinkSync(`${ROOT}/public/pdf/${libro.urlFile}`)
        fs.unlinkSync(`${ROOT}/public${libro.urlImg}`)

        await Libro.destroy({ where:{ idLibro } })
        const libros = await Libro.findAll()

        res.status(200).render('admin/adminLibro',{libros,msg:true, text:`Libro ${idLibro} Borrado Exitosamente`})

    } catch (err) {
        return res.json({msg:'Error Executing delete',err})
    }
}

const postNewLibro = (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({msg: "No files registered in the petition"})
    }
    const {nombreLibro, annoEdicion, nombreAutor, nombreEditorial, nombreCategoria } = req.body;
    const filePdf = req.files.pdf;
    const fileImg = req.files.img;
    const magicNum = Math.floor(Math.random()*599);
    const extension = fileImg.name.split('.');
    const nameFile = `${magicNum}.pdf`;
    const nameImg = `${magicNum}.${extension[extension.length - 1]}`;
    let libro;



    filePdf.mv(`${ROOT}/public/pdf/${nameFile}`)
        .then( () => {
            return  fileImg.mv(`${ROOT}/public/pdf/img/${nameImg}`);
        })
        .then(() => {
            return Libro.create({nombreLibro, annoEdicion, urlFile:nameFile,nombreAutor,nombreEditorial,urlImg:`/pdf/img/${nameImg}`})
        })
        .then( (libroRes) => {
            libro = libroRes;
            return Categoria.findOne({where: {nombreCategoria}})
        })
        .then( categoria => {
            return categoria.addLibro(libro)
        })
        .then( (resDB) => {
            return res.redirect('/admin/administrarLibros')
        })
        .catch( err => {
            return res.status(500).json({msg: "Error Uploading files into server", err})
        })

}

const updateLibro = async (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({msg: "No files registered in the petition"})
    }
    const {nombreLibro, annoEdicion, nombreAutor, nombreEditorial, nombreCategoria, idLibro } = req.body;
    const filePdf = req.files.pdf;
    const fileImg = req.files.img;
    const magicNum = Math.floor(Math.random()*599);
    const extension = fileImg.name.split('.');
    const nameFile = `${magicNum}.pdf`;
    const nameImg = `${magicNum}.${extension[extension.length - 1]}`;

    try {
        //file manage
        console.log(ROOT)
        let libro = await Libro.findByPk(idLibro);
        fs.unlinkSync(`${ROOT}/public/pdf/${libro.urlFile}`)
        fs.unlinkSync(`${ROOT}/public${libro.urlImg}`)
        await filePdf.mv(`${ROOT}/public/pdf/${nameFile}`);
        await fileImg.mv(`${ROOT}/public/pdf/img/${nameImg}`);

        //update values
        let categoria = await Categoria.findOne({where: {nombreCategoria}})
        await categoria.addLibro(libro)
        await Object.assign(libro,{nombreLibro, annoEdicion, urlFile:nameFile,nombreAutor,nombreEditorial,urlImg:`/pdf/img/${nameImg}`})
        await libro.save()
        return res.redirect('/admin/administrarLibros')
    } catch (err) {
        return res.status(500).json({msg: "Error Uploading files into server",err, err:err.message})
    }


}


module.exports = {
    getViewAdminUser,
    postNewUser,
    getBibliotecaAdmin,
    viewAdminLibro,
    viewAdminLibroForm,
    updateLibro,
    deleteLibro,
    postNewLibro
}