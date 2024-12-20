import dbConnect from "@/lib/dbConnect";
import { Category } from "@/models/category";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();

  const { name, parentCategory, properties } = await request.json();
  const category = await Category.create({
    name,
    parent: parentCategory || undefined,
    properties,
  });
  return NextResponse.json({ data: category }, { status: 201 });
};

export const GET = async () => {
  await dbConnect();
  const categories = await Category.find().populate("parent");
  return NextResponse.json({ data: categories }, { status: 200 });
};
