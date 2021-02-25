const router = require('express').Router();
const todoRoute = require('./todoRoute');
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/loginOauth',)
router.use('/todos', todoRoute)

module.exports = router;