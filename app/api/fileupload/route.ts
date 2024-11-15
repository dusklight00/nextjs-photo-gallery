import { NextRequest, NextResponse } from "next/server";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_S3_ENDPOINT ?? "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file: File = formData.get("file") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET ?? "",
    Key: file.name,
    Body: buffer,
  });

  try {
    const response = await s3.send(putObjectCommand);
    console.log(response);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { success: false, message: "Key is required" },
      { status: 400 }
    );
  }

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET ?? "",
    Key: key,
  });

  try {
    const response = await s3.send(getObjectCommand);
    const stream = response.Body as ReadableStream;

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as any) {
      chunks.push(new Uint8Array(chunk));
    }

    const buffer = Buffer.concat(chunks);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": response.ContentType ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
