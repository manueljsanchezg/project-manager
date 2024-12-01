import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

// model of task
export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})