const express = require('express');
const router = express.Router(); // Router statt app
const taskController = require('../controllers/taskController'); // Controllers importieren
// middleware import 
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, taskController.getTasks);
router.get('/search', taskController.getTaskBySearch);
router.get('/:id', taskController.getTasksById);


router.post('/', authMiddleware, taskController.createTask);

router.delete('/:id', authMiddleware, taskController.deleteTask);

router.put('/:id', authMiddleware, taskController.updateTask);

router.patch('/:id', taskController.patchTask);

module.exports = router;