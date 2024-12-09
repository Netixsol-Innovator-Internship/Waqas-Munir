import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  await dbConnect();
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileBase64 = Buffer.from(fileBuffer).toString("base64");
  const dataURI = `data:${file.type};base64,${fileBase64}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);

  console.log(uploadResponse);
  console.log(uploadResponse.secure_url);

  return NextResponse.json(
    { data: uploadResponse.secure_url },
    { status: 200 }
  );
};
