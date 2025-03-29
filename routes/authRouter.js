const { Router } = require("express")
const { loginUser, logoutUser } = require("../controllers/authController")

const authRouter = Router()

authRouter.post("/", loginUser)
authRouter.get("/logout", logoutUser)

module.exports = authRouter
