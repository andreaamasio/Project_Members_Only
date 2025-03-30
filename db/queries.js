const db = require("./pool")
const pool = db.pool

async function getAllMembers() {
  const { rows } = await pool.query("SELECT * FROM members_only")
  return rows
}
async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages_members m JOIN members_only p ON m.members_id = p.id"
  )
  return rows
}
async function postNewMessage(title, text, members_id) {
  const query =
    "INSERT INTO messages_members (title, text, members_id) VALUES ($1, $2, $3);"
  const values = [title, text, members_id]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error inserting message:", err)
  }
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
async function findUserById(id) {
  const result = await pool.query("SELECT * FROM members_only WHERE id = $1", [
    id,
  ])

  return result.rows[0] // Returns user if found, otherwise undefined
}
async function postNewMember(members_id) {
  const query = "UPDATE members_only SET is_member = TRUE WHERE id = $1;"
  const values = [members_id]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error converting user to member:", err)
  }
}

module.exports = {
  getAllMembers,
  postNewUser,
  getAllMessages,
  postNewMessage,
  findUserByEmail,
  findUserById,
  postNewMember,
}
