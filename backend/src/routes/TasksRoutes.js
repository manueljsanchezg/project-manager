import { Router } from 'express'
import {  } from '../controllers/TaskController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = Router()

// Obtener todos los proyectos de un usuario
router.get('/tasks', authenticateToken, fetchUserProjects)

// Obtener un proyecto específico de un usuario por su ID
router.get('/tasks/:taskId', authenticateToken, fetchUserProjectById)

// Crear un nuevo proyecto
router.post('/tasks', authenticateToken, createNewProject)

// Actualizar un proyecto del usuario por su ID
router.put('/tasks/:taskId', authenticateToken, updateUserProject)

// Eliminar un proyecto del usuario por su ID
router.delete('/tasks/:taskId', authenticateToken, deleteUserProject)
