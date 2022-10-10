const express = require('express');
const knex = require('./database');
const routes = express.Router();
// const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

//autenticação de usuário
const LoginController = require('./controllers/Usuarios/LoginController');
routes.post('/login', LoginController.login);

//usuarios
const UsuariosController = require('./controllers/Usuarios/UsuariosController');
routes.get('/usuarios', jwtConfig.verifyJWT, UsuariosController.index);
routes.post('/usuarios/create', jwtConfig.verifyJWT, UsuariosController.create);
routes.put('/usuarios/update/:id', jwtConfig.verifyJWT, UsuariosController.update);
routes.delete('/usuarios/delete/:id', jwtConfig.verifyJWT, UsuariosController.delete);

///marcas

const MarcasController = require('./controllers/Marcas/MarcasController');

routes.get('/marcas', jwtConfig.verifyJWT, MarcasController.index);
routes.post('/marcas/create', MarcasController.create);

    module.exports = routes;