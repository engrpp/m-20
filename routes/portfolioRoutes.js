import express from "express"
import {
  createPortfolio,
  getAllPortfolios,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/", auth, createPortfolio)
router.get("/", getAllPortfolios)
router.patch("/:id", auth, updatePortfolio)
router.delete("/:id", auth, deletePortfolio)

export default router

