import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function signup(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "All fields required" })

        const exists = await User.findOne({ email })
        if (exists) return res.status(409).json({ message: "Email in use" })

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hash })
        res.status(201).json({ id: user._id, email: user.email })
    } catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "All fields required" })

        const user = await User.findOne({ email })
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" })

        const match = await bcrypt.compare(password, user.password)
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.json({ token })
    } catch (err) {
        next(err)
    }
}
