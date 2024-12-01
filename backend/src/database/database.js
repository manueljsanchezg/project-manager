import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la BBDD
    process.env.DB_USER, // Usuario de la BBDD
    process.env.DB_PASSWORD, // Contraseña de la BBDD
    {
        host: process.env.DB_HOST, // host de la BBDD
        dialect: process.env.DB_DIALECT // Dialecto de la BBDD
    }
)