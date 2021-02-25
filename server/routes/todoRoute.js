const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/authentication');
const TodoController = require('../controllers/todoController');

router.use(authenticate);

router.get('/', TodoController.read);
router.get('/f', TodoController.read_false);
router.get('/t', TodoController.read_true);
router.post('/', TodoController.create);

router.get('/:id', authorize, TodoController.filter);
router.put('/:id', authorize, TodoController.update);
router.patch('/:id', authorize, TodoController.update_status);
router.delete('/:id', authorize, TodoController.delete);

module.exports = router;