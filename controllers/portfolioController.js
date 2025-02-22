import Portfolio from "../models/Portfolio.js"

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = new Portfolio({
      ...req.body,
      user: req.user._id,
    })
    await portfolio.save()
    res.status(201).json(portfolio)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find()
    res.json(portfolios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updatePortfolio = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["title", "description", "img", "codeLink", "liveLink"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" })
  }

  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id, user: req.user._id })

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" })
    }

    updates.forEach((update) => (portfolio[update] = req.body[update]))
    await portfolio.save()
    res.json(portfolio)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" })
    }

    res.json(portfolio)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

