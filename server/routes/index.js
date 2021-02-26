const router = require('express').Router();
const todoRoute = require('./todoRoute');
const UserController = require('../controllers/userController');
const TodoController = require('../controllers/todoController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/loginOauth', UserController.googleLogin);
router.use('/todos', todoRoute)
router.get('/quotes', TodoController.quotes);

module.exports = router;