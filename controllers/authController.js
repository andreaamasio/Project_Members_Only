const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("last_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("username").notEmpty().withMessage(`Username: ${emptyErr}`),
]
async function getLogIn(req, res) {
  res.render("log-in")
}
async function postLogIn(req, res) {
  console.log(req.body)
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let username = req.body.username
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  let is_admin = req.body.is_admin === "on" ? true : false

  await db.postNewUser(
    first_name,
    last_name,
    username,
    hashedPassword,
    is_admin
  )

  //res.send("Usernames: " + messages.map((message) => message.user).join(", "))
  res.redirect("/")
}
module.exports = { getLogIn, postLogIn }
