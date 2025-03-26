const { Router } = require("express")
//const { getAuthorById } = require("../controllers/indexController")
const formRouter = Router()

formRouter.get("/", (req, res) => {
  res.render("sign-up-form", {})
})

module.exports = formRouter
