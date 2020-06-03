const routes = require('express').Router();
const registerController = require('../controllers/registerController')


routes.get('/', registerController.getViewLogin);
routes.post('/', registerController.postLogin);
routes.get('/logout', registerController.postLogout);
routes.get('/recuperarClave',registerController.getViewForgetPassword)

module.exports = routes;