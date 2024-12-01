import express from 'express'
import ProjectRoutes from './routes/ProjectsRoutes.js'
import UserRoutes from './routes/UsersRoutes.js'

const app = express()

//middlewares
app.use(express.json())

app.use(UserRoutes)
app.use(ProjectRoutes)

export default app