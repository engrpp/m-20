import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

