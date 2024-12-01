import express from 'express'
import ProjectRoutes from './routes/ProjectsRoutes.js'
import UserRoutes from './routes/UsersRoutes.js'
import TaskRoutes from './routes/TasksRoutes.js'

const app = express()

//middlewares
app.use(express.json())

app.use(UserRoutes)
app.use(ProjectRoutes)
app.use(TaskRoutes)

export default app