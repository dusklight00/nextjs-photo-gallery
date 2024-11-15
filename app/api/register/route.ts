import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/database";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const { username, password, email } = Object.fromEntries(formData.entries());

  if (!username || !password || !email) {
    return NextResponse.json(
      { success: false, message: "Missing username, password, or email" },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(
      username as string,
      password as string,
      email as string
    );
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
};
