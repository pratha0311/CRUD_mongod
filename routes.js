const express = require ('express')
const controller= require('./controller')
const routes= express.Router();

routes.get('/', controller.home)


module.exports = routes;