const express = require('express');
const router = express.Router(); // Router statt app
const taskController = require('../controllers/taskController'); // Controllers importieren

router.get('/', taskController.getAllTasks);
router.get('/search', taskController.getTaskBySearch);
router.get('/:id', taskController.getTasksById);


router.post('/', taskController.createTask);

router.delete('/:id', taskController.delteTask);

router.put('/:id', taskController.updateTask);

router.patch('/:id', taskController.patchTask);

module.exports = router;