const { body, validationResult } = require("express-validator")
const db = require("../db/queries")
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("last_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("username").notEmpty().withMessage(`Username: ${emptyErr}`),
]
async function getMessages(req, res) {
  const messages = await db.getAllMessages()
  console.log(`Messages:`, messages)

  res.render("index", { messages: messages })
}
async function postNewMessage(req, res) {
  let text = req.body.text_message
  let title = req.body.title
  //let user = req.body.user
  console.log(text)
  console.log(title)
  await db.postNewMessage(text, user)

  //res.send("Usernames: " + messages.map((message) => message.user).join(", "))
  res.redirect("/")
}
module.exports = { getMessages, postNewMessage }
