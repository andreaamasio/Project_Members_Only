const { Router } = require("express")
const {
  getNewMessage,
  postNewMessage,
} = require("../controllers/messagesController")
const messageRouter = Router()

messageRouter.get("/", getNewMessage)
messageRouter.post("/", postNewMessage)

module.exports = messageRouter
