import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername, getImagesByUsername } from "@/app/database";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { success: false, message: "Username is required" },
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

  const images = await getImagesByUsername(username);

  if (!images || images.length === 0) {
    return NextResponse.json(
      { success: false, message: "No images found for this user" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, images });
};
