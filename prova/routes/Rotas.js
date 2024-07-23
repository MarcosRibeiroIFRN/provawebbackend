const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../services/autenticacao');

router.post('/usuarios', userController.createUser);
router.get('/usuarios', authMiddleware.verifyToken, userController.getAllUsers);
router.get('/usuarios/:id', authMiddleware.verifyToken, userController.getUserById);
router.put('/usuarios/:id', authMiddleware.verifyToken, userController.updateUser);
router.delete('/usuarios/:id', authMiddleware.verifyToken, userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;
