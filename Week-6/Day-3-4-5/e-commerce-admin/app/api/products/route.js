import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product";

export const POST = async (req) => {
  await dbConnect();

  const { title, description, price, images } = await req.json();
  const product = await Product.create({ title, description, price, images });
  return NextResponse.json(
    {
      message: "Product Created",
      data: product,
    },
    { status: 201 }
  );
};

export const GET = async () => {
  await dbConnect();

  const products = await Product.find({});
  return NextResponse.json(
    {
      data: products,
    },
    { status: 200 }
  );
};
