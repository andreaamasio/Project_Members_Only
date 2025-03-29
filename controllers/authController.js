const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

// Login handler
const loginUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
})

// Logout handler
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/")
  })
}
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("last_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("username").notEmpty().withMessage(`Username: ${emptyErr}`),
]

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
  res.redirect("/")
}
module.exports = { postLogIn, loginUser, logoutUser }
