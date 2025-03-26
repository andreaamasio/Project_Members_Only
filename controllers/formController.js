const { body, validationResult } = require("express-validator")
const db = require("../db/queries")
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("last_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("username").notEmpty().withMessage(`Username: ${emptyErr}`),
]
// async function getMessages(req, res) {
//   const messages = await db.getAllMessages()
//   console.log(`Messages:`, messages)

//   res.render("index", { messages: messages })
// }
async function postNewUser(req, res) {
  console.log(req.body)
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let username = req.body.username
  let password = req.body.password
  let is_admin = req.body.is_admin === "on" ? true : false

  await db.postNewUser(first_name, last_name, username, password, is_admin)

  //res.send("Usernames: " + messages.map((message) => message.user).join(", "))
  res.redirect("/")
}
module.exports = { postNewUser }
