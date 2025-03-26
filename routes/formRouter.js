const { Router } = require("express")
const { postNewUser } = require("../controllers/formController")
const formRouter = Router()

formRouter.get("/", (req, res) => {
  res.render("sign-up-form", {})
})
formRouter.post("/", postNewUser)

module.exports = formRouter
