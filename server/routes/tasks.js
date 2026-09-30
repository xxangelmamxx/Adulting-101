import express from 'express'
import TasksController from '../controllers/tasks.js'

const router = express.Router()

router.get('/', TasksController.getTasks)

router.get('/:taskId', TasksController.getTaskById)

export default router
