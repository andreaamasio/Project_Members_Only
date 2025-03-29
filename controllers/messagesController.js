const { body, validationResult } = require("express-validator")
const db = require("../db/queries")
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("last_name").notEmpty().withMessage(`Username: ${emptyErr}`),
  body("username").notEmpty().withMessage(`Username: ${emptyErr}`),
]
async function getMessages(req, res) {
  const messages_members = await db.getAllMessages()
  // console.log("req.session.flash:", req.session.flash) // Debugging
  // console.log("req.user:", req.user) // Debugging

  // Get the flash messages from the session
  const flashMessages = req.session.flash || {}

  // Clear the flash messages from the session
  req.session.flash = {}

  // Render the page with messages
  res.render("index", {
    messages: flashMessages,
    messages_members: messages_members,
    user: req.user,
  })
}
async function getNewMessage(req, res) {
  res.render(
    "new-message-form"
    //{ messages: messages }
  )
}
async function postNewMessage(req, res) {
  let title = req.body.message_title
  let text = req.body.message_text
  let members_id = req.user.id
  //let user = req.body.user
  console.log(text)
  console.log(title)
  await db.postNewMessage(title, text, members_id)

  //res.send("Usernames: " + messages.map((message) => message.user).join(", "))
  res.redirect("/")
}
module.exports = { getMessages, getNewMessage, postNewMessage }
