import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import portfolioRoutes from "./routes/portfolioRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/portfolios", portfolioRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

