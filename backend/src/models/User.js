import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Project } from "./Project.js"

// model of user
export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Project, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

Project.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
})