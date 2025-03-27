const path = require("node:path")
const express = require("express")
const formRouter = require("./routes/formRouter")
const indexRouter = require("./routes/indexRouter")
const authenticationRouter = require("./routes/authenticationRouter")
const app = express()
app.use(express.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
const assetsPath = path.join(__dirname, "public")

app.use(express.static(assetsPath))
app.use("/sign-up", formRouter)
app.use("/log-in", authenticationRouter)
app.use("/", indexRouter)

const PORT = 3000
app.listen(PORT, () =>
  console.log(`Members only app, listening to port ${PORT}`)
)
