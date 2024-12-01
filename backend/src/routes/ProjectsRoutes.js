import { Router } from 'express'
import { createProjectValidator, updateProjectValidator } from '../middleware/ProjectValidator.js'
import { fetchUserProjects, createNewProject, updateUserProject, fetchUserProjectById, deleteUserProject, toggleProjectActiveState } from '../controllers/ProjectController.js'
import { fetchTasksByProjectId, fetchTaskByIdInProject, createTaskInProject, updateTaskInProject, deleteTaskFromProject, toggleTaskCompletedState } from '../controllers/TaskController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { createTaskValidator, updateTaskValidator } from '../middleware/TaskValidator.js'

const router = Router()

// Obtener todos los proyectos de un usuario
router.get('/projects', authenticateToken, fetchUserProjects)

// Obtener un proyecto específico de un usuario por su ID
router.get('/projects/:projectId', authenticateToken, fetchUserProjectById)

// Crear un nuevo proyecto
router.post('/projects', authenticateToken, createProjectValidator, createNewProject)

// Actualizar un proyecto del usuario por su ID
router.put('/projects/:projectId', authenticateToken, updateProjectValidator, updateUserProject)

// Eliminar un proyecto del usuario por su ID
router.delete('/projects/:projectId', authenticateToken, deleteUserProject)

// Actualizar el estado activo de un proyecto
router.patch('/projects/:projectId', authenticateToken, toggleProjectActiveState)

// Obtener todas las tareas de un proyecto específico
router.get('/projects/:projectId/tasks', authenticateToken, fetchTasksByProjectId)

// Obtener una tarea específica de un proyecto por su ID
router.get('/projects/:projectId/tasks/:taskId', authenticateToken, fetchTaskByIdInProject)

// Crear una nueva tarea en un proyecto específico
router.post('/projects/:projectId/tasks', authenticateToken, createTaskValidator, createTaskInProject)

// Actualizar una tarea específica de un proyecto por su ID
router.put('/projects/:projectId/tasks/:taskId', authenticateToken, updateTaskValidator, updateTaskInProject)

// Eliminar una tarea específica de un proyecto por su ID
router.delete('/projects/:projectId/tasks/:taskId', authenticateToken, deleteTaskFromProject)

// Actualizar el estado completed de una tarea en un proyecto
router.patch('/projects/:projectId/tasks/:taskId', authenticateToken, toggleTaskCompletedState)

export default router
