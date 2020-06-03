const router = require('express').Router();
const prestamoController = require('../controllers/prestamoController');
const {tokenValidator} = require('../middleware/tokenValidator')

router.post('/:idLibro',tokenValidator, prestamoController.postNewPrestamo);
router.get('/',tokenValidator, prestamoController.getPrestamosUsuario);

module.exports = router;