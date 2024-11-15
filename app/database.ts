import { db } from "./drizzle";
import { usersTable, imagesTable } from "./drizzle/schema";
import { eq } from "drizzle-orm";

export async function findUserByUsername(username: string) {
  try {
    const res = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    return res[0];
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
    const res = await db
      .insert(usersTable)
      .values({
        username,
        password,
        email,
      })
      .execute();
    return res;
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

    const res = await db
      .insert(imagesTable)
      .values({
        user_id: user.id,
        key,
      })
      .execute();

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

    const res = await db
      .select()
      .from(imagesTable)
      .where(eq(imagesTable.user_id, user.id));

    return res;
  } catch (err) {
    console.error("Error getting images by username:", err);
    throw err;
  }
}

export async function deleteImageByKey(key: string) {
  try {
    const res = await db
      .delete(imagesTable)
      .where(eq(imagesTable.key, key))
      .execute();

    return res;
  } catch (err) {
    console.error("Error deleting image by key:", err);
    throw err;
  }
}
