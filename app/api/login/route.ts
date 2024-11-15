import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "@/app/database";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const { username, password } = Object.fromEntries(formData.entries());

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
};
