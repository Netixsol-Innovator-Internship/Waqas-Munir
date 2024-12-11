import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product";
import { Category } from "@/models/category";

export async function GET(request, context) {
  await dbConnect();

  const { id } = await context.params;

  const category = await Category.findById(id).populate("parent");

  if (!category) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: category,
    },
    { status: 200 }
  );
}

export async function PUT(request, context) {
  await dbConnect();

  const { id } = await context.params;
  const data = await request.json();

  const category = await Category.findByIdAndUpdate(id, data);

  if (!category) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: category,
    },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  await dbConnect();

  const { id } = await context.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return NextResponse.json(
      {
        message: "Data Not Found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      data: category,
    },
    { status: 200 }
  );
}
