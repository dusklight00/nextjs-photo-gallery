import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "@/app/database";

export const POST = async (req: NextRequest) => {
  console.log("hi");

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Missing username or password" },
        { status: 400 }
      );
    }

    const user = await findUserByUsername(username as string);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }
};
