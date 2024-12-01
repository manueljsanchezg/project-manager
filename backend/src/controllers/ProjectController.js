import { Project } from "../models/Project.js"
import { Task } from "../models/Task.js"

// Controlador de Proyectos

// Obtener todos los proyectos
export const fetchAllProjects = async (req, res) => {
    try {

        const projects = await Project.findAll()

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: "Error fetching all projects", error: error.message })
    }
}

// Obtener todos los proyectos de un usuario
export const fetchUserProjects = async (req, res) => {
    try {

        const projects = await Project.findAll({
            where: {
                userId: req.user.userId
            }
        })

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: "Error fetching user projects", error: error.message })
    }
}

// Crear un nuevo proyecto
export const createNewProject = async (req, res) => {
    try {
        const { name, active } = req.body

        const newProject = await Project.create({
            name,
            active,
            userId: req.user.userId,
        })

        res.status(201).json(newProject)
    } catch (error) {
        res.status(500).json({ message: "Error creating new project", error: error.message })
    }
}

// Obtener un proyecto por su ID
export const fetchProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectId)

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: "Error fetching project by ID", error: error.message })
    }
}

// Obtener un proyecto específico de un usuario
export const fetchUserProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: {
                id: req.params.projectId,
                userId: req.user.userId
            }
        })

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: "Error fetching user project by ID", error: error.message })
    }
}

// Actualizar un proyecto del usuario
export const updateUserProject = async (req, res) => {
    try {
        const { name, active } = req.body

        const projectToUpdate = await Project.findOne({
            where: {
                id: req.params.projectId,
                userId: req.user.userId
            }
        })

        if (!projectToUpdate) return res.status(404).json({ message: "Project not found" })

        if (name !== undefined) projectToUpdate.name = name

        if (active !== undefined) projectToUpdate.active = active

        await projectToUpdate.save()

        res.status(200).json(projectToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error updating user project", error: error.message })
    }
}

// Eliminar un proyecto del usuario
export const deleteUserProject = async (req, res) => {
    try {
        const rowsDeleted = await Project.destroy({
            where: {
                id: req.params.projectId,
                userId: req.user.userId
            }
        })

        if (rowsDeleted === 0) return res.status(404).json({ message: "Project not found" })

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ message: "Error deleting user project", error: error.message })
    }
}

// Actualizar el estado activo (active) de un proyecto
export const toggleProjectActiveState = async (req, res) => {
    try {
        const { active } = req.body

        if (typeof active !== 'boolean') return res.status(400).json({ message: "Invalid value for 'active'. Must be a boolean." })

        const projectToUpdate = await Project.findOne({
            where: {
                id: req.params.projectId,
                userId: req.user.userId
            }
        })

        if (!projectToUpdate) return res.status(404).json({ message: "Project not found" })

        projectToUpdate.active = active
        
        await projectToUpdate.save()

        res.status(200).json(projectToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error updating project active state", error: error.message })
    }
}

