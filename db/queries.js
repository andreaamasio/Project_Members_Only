const db = require("./pool")
const pool = db.pool

async function getAllMembers() {
  const { rows } = await pool.query("SELECT * FROM members_only")
  return rows
}
// async function postNewMessage(text, user) {
//   await pool.query(`INSERT INTO messages (text,"user") VALUES ($1, $2)`, [
//     text,
//     user,
//   ])
//   console.log(`insert of: ${text}, ${user} was done`)
//   return
// }
module.exports = { getAllMembers, postNewMessage }
