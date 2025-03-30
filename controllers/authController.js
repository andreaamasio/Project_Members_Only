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
async function getJoinClub(req, res) {
  res.render("join-the-club", { user: req.user })
}
async function postJoinClub(req, res) {
  let member_passcode = req.body.member_passcode
  let members_id = req.user.id

  let match = member_passcode === "member"
  console.log(`member_passcode: ${member_passcode}`)
  console.log(`members_id: ${members_id}`)

  if (match) {
    await db.postNewMember(members_id)
    res.redirect("/") // Successful redirect
  } else {
    res.render("join-the-club", {
      message: "Incorrect passcode",
      user: req.user,
    }) // Redirect instead of render
  }
}
module.exports = { loginUser, logoutUser, postJoinClub, getJoinClub }
