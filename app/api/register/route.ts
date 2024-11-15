import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/database";

export const POST = async (req: NextRequest) => {
  try {
    const { username, password, email } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { success: false, message: "Missing username, password, or email" },
        { status: 400 }
      );
    }

    const user = await createUser(username, password, email);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
};
