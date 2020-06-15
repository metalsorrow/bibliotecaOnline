const Libro = require('../models/libro')
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')

const mainDir = path.dirname(process.mainModule.filename)


const getBiblioteca = (req,res) => {
    console.log(req.cookie)
    Libro.findAll()
        .then( libros => {
            return res.status(200).render('biblioteca/bibliotecaUser.ejs',{libros,message: false})
        })
        .catch( err => {
            return res.statusDF(505).json({ok:false, msg: 'Error serching books', err})
        })
}

const getLibro = (req,res) => {
    const {idLibro} = req.params

    Libro.findByPk(idLibro)
        .then( libro => {
            if(!libro){
                return res.status(404).json({
                    ok: false,
                    msg: 'Libro Not Found',
                })
            }
            
            return res.status(200).render('biblioteca/book/detalleLibro', {libro})

        })
        .catch( err => {
            return res.status(505).json({ok: false, msg: 'Error searching Book', err})
        })

}

const getPdf = (req,res) => {
    
    const {idLibro} = req.query

    
    Libro.findByPk(idLibro)
        .then( libro => {
            if(!libro){
                return res.status(404).json({
                    ok: false,
                    msg: 'Libro Not Found',
                })
            }
            const url = path.join(mainDir,'public','pdf', libro.urlFile)
            const data =fs.readFileSync(url);
            
            res.contentType("application/pdf");
            return res.send(data);
        })
        .catch( err => {
            return res.status(505).json({ok: false, msg: 'Error searching PDF', err})
        })

}

const getSearchBooks = (req, res) => {

    const Op = Sequelize.Op;
    const {search} = req.query;

    if( search.length > 0){

        Libro.findAll({
            where:{
                nombreLibro:{
                    [Op.like]: `%${search}%`
                }
            }
        })
        .then( libros => {
            if(libros.length === 0){
                return res.status(200).render('biblioteca/bibliotecaUser.ejs',{libros,message: true, messageText: "No exiten libros que contenga este texto"})
            }
            return res.status(200).render('biblioteca/bibliotecaUser.ejs',{libros,message: false})
        })
        .catch( err =>{
            return res.status(505).json({ok: false, msg: 'Error Searching books', err})
        })

    } else {
        return res.redirect('/biblioteca/');
    }
}

module.exports = {
    getBiblioteca,
    getLibro,
    getPdf,
    getSearchBooks
}