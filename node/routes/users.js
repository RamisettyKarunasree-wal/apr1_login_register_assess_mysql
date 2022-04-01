var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
router.get('/create', userController.createUsersTable);
router.post('/register', userController.registerUser);
router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);
module.exports = router;
