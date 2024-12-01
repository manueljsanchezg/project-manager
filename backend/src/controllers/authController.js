import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()


export const registerUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser.id })
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: '3h' }
        )
        const decodedToken = jwt.decode(token)
        console.log("Fecha de expiración del token:", new Date(decodedToken.exp * 1000)) // Convertir a fecha legible
        res.status(200).json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message })
    }
}