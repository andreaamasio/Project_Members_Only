const { Router } = require("express")
const {
  loginUser,
  logoutUser,
  getJoinClub,
  postJoinClub,
} = require("../controllers/authController")

const authRouter = Router()

authRouter.post("/", loginUser)
authRouter.get("/logout", logoutUser)
authRouter.get("/join-the-club", getJoinClub)
authRouter.post("/join-the-club", postJoinClub)

module.exports = authRouter
