import { Task } from "../models/Task.js"

// Controlador de Tareas

// Obtener todas las tareas
export const fetchAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll()
        
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Error fetching all tasks", error: error.message })
    }
}

// Obtener una tarea específica por su ID
export const fetchTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: "Error fetching task by ID", error: error.message })
    }
}

// Crear una tarea
export const createTask = async (req, res) => {
    try {
        const { name, description, priority, completed, projectId } = req.body

        const newTask = await Task.create({
            name,
            description,
            priority,
            completed,
            projectId
        })

        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ message: "Error creating new project", error: error.message })
    }
}

// Actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
    try {
        const { name, description, priority, completed } = req.body

        const taskToUpdate = await Task.findByPk(req.params.taskId)

        if (!taskToUpdate) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (name !== undefined) taskToUpdate.name = name

        if (description !== undefined) taskToUpdate.description = description

        if (priority !== undefined) taskToUpdate.priority = priority

        if (completed !== undefined) taskToUpdate.completed = completed

        await taskToUpdate.save()

        res.status(200).json(taskToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message })
    }
}

// Eliminar una tarea por su ID
export const deleteTaskById = async (req, res) => {
    try {
        const rowsDeleted = await Task.destroy({
            where: { id: req.params.taskId },
        })

        if (rowsDeleted === 0) return res.status(404).json({ message: "Task not found" })

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message })
    }
}

// Tareas relacionadas con proyectos

// Obtener todas las tareas de un proyecto específico
export const fetchTasksByProjectId = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                projectId: req.params.projectId
            }
        })

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks for project", error: error.message })
    }
}

// Crear una nueva tarea dentro de un proyecto
export const createTaskInProject = async (req, res) => {
    try {
        const projectId = req.params.projectId

        const { name, description, priority, completed } = req.body

        const newTask = await Task.create({
            name,
            description,
            priority,
            completed,
            projectId,
        })

        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ message: "Error creating task in project", error: error.message })
    }
}

// Obtener una tarea específica por su ID dentro de un proyecto
export const fetchTaskByIdInProject = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.taskId,
                projectId: req.user.projectId,
            }
        })

        if (!task) return res.status(404).json({ message: "Task not found in this project" })

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: "Error fetching task by ID in project", error: error.message })
    }
}

// Actualizar una tarea dentro de un proyecto
export const updateTaskInProject = async (req, res) => {
    try {
        const { name, description, priority, completed } = req.body

        const taskToUpdate = await Task.findOne({
            where: {
                id: req.params.taskId,
                projectId: req.params.projectId,
            }
        })

        if (!taskToUpdate) return res.status(404).json({ message: "Task not found in this project" })

        if (name !== undefined) taskToUpdate.name = name

        if (description !== undefined) taskToUpdate.description = description

        if (priority !== undefined) taskToUpdate.priority = priority

        if (completed !== undefined) taskToUpdate.completed = completed

        await taskToUpdate.save()

        res.status(200).json(taskToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error updating task in project", error: error.message })
    }
}

// Eliminar una tarea específica por su ID dentro de un proyecto
export const deleteTaskFromProject = async (req, res) => {
    try {
        const rowsDeleted = await Task.destroy({
            where: {
                id: req.params.taskId,
                projectId: req.user.projectId,
            }
        })

        if (rowsDeleted === 0) return res.status(404).json({ message: "Task not found in this project" })

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ message: "Error deleting task from project", error: error.message })
    }
}

// Actualizar el estado completado (completed) de una tarea
export const toggleTaskCompletedState = async (req, res) => {
    try {
        const { completed } = req.body
    
        if (typeof completed !== 'boolean') return res.status(400).json({ message: "Invalid value for 'completed'. Must be a boolean." })

        const taskToUpdate = await Task.findOne({
            where: {
                id: req.params.taskId,
                projectId: req.params.projectId
            }
        })

        if (!taskToUpdate) return res.status(404).json({ message: "Task not found" })

        taskToUpdate.completed = completed

        await taskToUpdate.save()

        res.status(200).json(taskToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error updating task completed state", error: error.message })
    }
}
