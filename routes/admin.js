const router = require('express').Router();
const adminController = require('../controllers/adminController.js');
const {tokenValidator} = require('../middleware/tokenValidator');

router.get('/',tokenValidator,adminController.getBibliotecaAdmin);

router.get('/administrarUsuarios',tokenValidator,adminController.getViewAdminUser);

router.post('/postNewUser',tokenValidator,adminController.postNewUser);


//Libro

router.get('/administrarLibros', tokenValidator, adminController.viewAdminLibro)
router.get('/administrarLibrosForm/', tokenValidator,adminController.viewAdminLibroForm)
// router.get('/administrarLibros', tokenValidator, adminController.viewAdminLibroForm)
router.post('/administrarLibro/delete/:idLibro', tokenValidator, adminController.deleteLibro)
router.post('/administrarLibro/update', tokenValidator, adminController.updateLibro)
router.post('/administrarLibro', tokenValidator, adminController.postNewLibro)

module.exports = router;