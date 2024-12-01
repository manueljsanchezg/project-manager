import { Router } from 'express'
import { createTask, deleteTaskById, fetchAllTasks, fetchTaskById, updateTaskById } from '../controllers/TaskController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = Router()

// Obtener todas las tareas
router.get('/tasks', authenticateToken, fetchAllTasks)

// Obtener una tarea específica por su ID
router.get('/tasks/:taskId', authenticateToken, fetchTaskById)

// Crear una tarea
router.post('/tasks', authenticateToken, createTask)

// Actualizar una tarea por su ID
router.put('/tasks/:taskId', authenticateToken, updateTaskById)

// Eliminar una tarea por su ID
router.delete('/tasks/:taskId', authenticateToken, deleteTaskById)

export default router