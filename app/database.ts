import { Client } from "pg";

const client = new Client({
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "5432", 10),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || "photogalleryapp",
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Failed to connect to PostgreSQL:", err));

export async function findUserByUsername(username: string) {
  try {
    const res = await client.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows[0];
  } catch (err) {
    console.error("Error finding user by username:", err);
    throw err;
  }
}

export async function createUser(
  username: string,
  password: string,
  email: string
) {
  try {
    const res = await client.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [username, password, email]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error creating new user:", err);
    throw err;
  }
}

export default client;
