const { Router } = require("express")
const express = require("express")

const messagesController = require("../controllers/messagesController")
const indexRouter = Router()
indexRouter.use(express.urlencoded({ extended: true }))

indexRouter.get("/", messagesController.getMessages)

module.exports = indexRouter
