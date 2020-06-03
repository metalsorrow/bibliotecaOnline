const router = require('express').Router();
const adminController = require('../controllers/adminController.js');
const {tokenValidator} = require('../middleware/tokenValidator')

router.get('/',tokenValidator,adminController.getBibliotecaAdmin);

router.get('/administrarUsuarios',tokenValidator,adminController.getViewAdminUser);

router.post('/postNewUser',tokenValidator,adminController.postNewUser);
// router.get('/',adminController.postNewUser);


module.exports = router;