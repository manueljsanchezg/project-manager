import dotenv from 'dotenv'
import app from './app.js'
import { sequelize } from './database/database.js'
//import './models/User.js'
//import './models/Task.js'
//import './models/Project.js'

dotenv.config()

const PORT = process.env.PORT || 3036

async function main() {
    try {
        await sequelize.sync({ force: false })
        app.listen(PORT)
        console.log('SERVER is listening', PORT)
    } catch (error) {
        console.error(error)
    }

}

main()
