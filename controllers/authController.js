const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

// Login handler
const loginUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
})

// Logout handler
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/")
  })
}

module.exports = { loginUser, logoutUser }
