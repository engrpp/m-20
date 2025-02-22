import mongoose from "mongoose"

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    codeLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
)

const Portfolio = mongoose.model("Portfolio", portfolioSchema)

export default Portfolio

