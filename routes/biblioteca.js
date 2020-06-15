const router = require('express').Router();
const {tokenValidator} = require('../middleware/tokenValidator')
const {getBiblioteca, getLibro, getPdf, getSearchBooks} = require('../controllers/bibliotecaController')

router.get('/pdf', getPdf);

router.get('/',tokenValidator,getBiblioteca);
    
router.get('/search/',tokenValidator,getSearchBooks);

router.get('/:idLibro',tokenValidator,getLibro);




module.exports = router;