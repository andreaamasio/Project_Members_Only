#! /usr/bin/env node
require("dotenv").config()
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  surname VARCHAR ( 255 ) NOT NULL,
  username VARCHAR ( 255 ) NOT NULL UNIQUE,
  password VARCHAR ( 255 ) NOT NULL,
  is_member BOOLEAN NOT NULL DEFAULT FALSE,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);`

async function main() {
  console.log("Seeding database...")
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()
    await client.query(SQL)
    console.log("Database seeded successfully!")
  } catch (err) {
    console.error("Error seeding database:", err)
  } finally {
    await client.end()
  }
}

main()
