const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")
const emptyErr = "cannot be empty."
const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage(`First Name: ${emptyErr}`)
    .isAlpha()
    .withMessage(`First Name: Only letters are allowed`), // Prevent numbers/special chars

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage(`Last Name: ${emptyErr}`)
    .isAlpha()
    .withMessage(`Last Name: Only letters are allowed`),

  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Email: ${emptyErr}`)
    .isEmail()
    .withMessage(`Email: Please use a valid email address`)
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      const existingUser = await db.findUserByEmail(value)
      if (existingUser) {
        throw new Error("Username already exists. Please choose another one.")
      }
    }),

  body("password")
    .notEmpty()
    .withMessage(`Password: ${emptyErr}`)
    .isLength({ min: 8 })
    .withMessage(`Password: Minimum 8 characters`)
    .matches(/[A-Z]/)
    .withMessage(`Password: Must contain at least one uppercase letter`)
    .matches(/[0-9]/)
    .withMessage(`Password: Must contain at least one number`)
    .matches(/[\W_]/)
    .withMessage(
      `Password: Must contain at least one special character (!@#$%^&*)`
    ),
]

const postNewUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      })
    }
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

    //res.send("Usernames: " + messages.map((message) => message.user).join(", "))
    res.redirect("/")
  },
]
module.exports = { postNewUser }
