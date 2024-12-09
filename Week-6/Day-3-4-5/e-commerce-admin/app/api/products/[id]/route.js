import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product";

export async function GET(request, context) {
  await dbConnect();

  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: product,
    },
    { status: 200 }
  );
}

export async function PUT(request, context) {
  await dbConnect();

  const { id } = await context.params;
  const data = await request.json();

  const product = await Product.findByIdAndUpdate(id, data);

  if (!product) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: product,
    },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  await dbConnect();

  const { id } = await context.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: product,
    },
    { status: 200 }
  );
}
