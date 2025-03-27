const db = require("./pool")
const pool = db.pool

async function getAllMembers() {
  const { rows } = await pool.query("SELECT * FROM members_only")
  return rows
}
async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages_members")
  return rows
}
async function postNewUser(
  first_name,
  last_name,
  username,
  password,
  is_admin
) {
  const query = `
    INSERT INTO members_only (name, surname, username, password, admin)
    VALUES ($1, $2, $3, $4, $5);`
  const values = [first_name, last_name, username, password, is_admin]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error inserting user:", err)
  }
}
async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM members_only WHERE username = $1",
    [email]
  )
  return result.rows[0] // Returns user if found, otherwise undefined
}
module.exports = { getAllMembers, postNewUser, getAllMessages, findUserByEmail }
