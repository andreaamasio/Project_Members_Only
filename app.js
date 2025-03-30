const path = require("node:path")
const express = require("express")
const formRouter = require("./routes/formRouter")
const indexRouter = require("./routes/indexRouter")
const messageRouter = require("./routes/messageRouter")
const authRouter = require("./routes/authRouter")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
const db = require("./db/queries")
const app = express()
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
app.use(express.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
)
const assetsPath = path.join(__dirname, "public")
app.use((req, res, next) => {
  res.locals.user = req.user // Make user available in all templates
  next()
})
app.use(express.static(assetsPath))
// Session middleware
app.use(flash())
// Initialize Passport and use session

app.use(passport.initialize())
app.use(passport.session())

// Set up Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByEmail(username)

      if (!user) return done(null, false, { message: "Incorrect username" })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: "Incorrect password" })

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
)

// Serialize user
passport.serializeUser((user, done) => done(null, user.id))

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
app.use("/new-message", messageRouter)
app.use("/sign-up", formRouter)
app.use("/login", authRouter)
app.use("/", indexRouter)

const PORT = 3000
app.listen(PORT, () =>
  console.log(`Members only app, listening to port ${PORT}`)
)
