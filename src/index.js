import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import expenseRoutes from "./routes/expenses.js"

dotenv.config({
    path: ".env.local"
})
connectDB()

const app = express()
app.use(express.json())

app.use("/signup", authRoutes)
app.use("/login", authRoutes)
app.use("/expenses", expenseRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

const PORT = process.env.PORTS
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
