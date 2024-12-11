import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { Order } from "@/models/order";

export const GET = async (request) => {
  await dbConnect();

  const orders = await Order.find().sort({ createdAt: -1 });

  return NextResponse.json({ data: orders }, { status: 200 });
};
