import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername, getImagesByUsername } from "@/app/database";
import { deleteImageByKey } from "@/app/database";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_S3_ENDPOINT ?? "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

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

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { success: false, message: "Image key is required" },
      { status: 400 }
    );
  }

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET ?? "",
    Key: key,
  });

  try {
    await s3.send(deleteObjectCommand);
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { success: false, message: "Image could not be deleted" },
      { status: 500 }
    );
  }

  const deleted = await deleteImageByKey(key);

  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Image not found or could not be deleted" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Image deleted successfully",
  });
};
