import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "@/app/database";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Missing username or password" },
      { status: 400 }
    );
  }

  const user = await findUserByUsername(username);

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
};
