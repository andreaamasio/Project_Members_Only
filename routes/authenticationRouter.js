const { Router } = require("express")
const { getLogIn, postLogIn } = require("../controllers/authController")
const authenticationRouter = Router()

authenticationRouter.get("/", getLogIn)

authenticationRouter.post("/", postLogIn)

module.exports = authenticationRouter
