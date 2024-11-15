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

export async function addImageEntry(username: string, key: string) {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const res = await client.query(
      "INSERT INTO images (user_id, key) VALUES ($1, $2) RETURNING *",
      [user.id, key]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error adding image entry:", err);
    throw err;
  }
}

export async function getImagesByUsername(username: string) {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const res = await client.query("SELECT * FROM images WHERE user_id = $1", [
      user.id,
    ]);
    return res.rows;
  } catch (err) {
    console.error("Error getting images by username:", err);
    throw err;
  }
}

export default client;
