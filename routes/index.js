const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController.js');
const roleController = require('../controllers/RoleController.js');
const subscriptionController = require('../controllers/SubscriptionController.js');

module.exports = function(){
    // Usuario

    // Crear un usuario
    router.post('/usuarios', usuarioController.crearUsuario);

    // Obtener todos los usuarios
    router.get('/usuarios', usuarioController.obtenerUsuarios);

    // Obtener un usuario por ID
    router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

    // Actualizar un usuario
    router.put('/usuarios/:id', usuarioController.actualizarUsuario);

    // Actualizar estado de prueba
    router.put('/usuarios/trial/:email', usuarioController.actualizarEstadoPrueba);

    // Eliminar un usuario
    router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

    // Roles
    router.post('/roles', roleController.crearRole);

    // Obtener todos los roles
    router.get('/roles', roleController.obtenerRoles);

    // Obtener un rol por ID
    router.get('/roles/:id', roleController.obtenerRolePorId);

    // Actualizar un rol
    router.put('/roles/:id', roleController.actualizarRole);

    // Eliminar un rol
    router.delete('/roles/:id', roleController.eliminarRole);

    // Obtener subscripciones
    router.get('/subscriptions', subscriptionController.getSubscriptions);

    // Obtener subscripciones stripe
    router.get('/subscriptions/stripe', subscriptionController.getStripeSubscriptions);

    // Crear suscripcion
    router.post('/subscriptions', subscriptionController.createSubscription);

    // Actualizar suscripcion
    router.put('/subscriptions/:id', subscriptionController.updateSubscription)

    //Login 
    router.post('/login', usuarioController.login);

    // Logout
    router.post('/logout', usuarioController.logout);

    return router
}   
