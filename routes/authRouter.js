const { Router } = require("express")
const { getLogIn, postLogIn } = require("../controllers/authController")
const authenticationRouter = Router()

authenticationRouter.post("/", postLogIn)

module.exports = authenticationRouter
