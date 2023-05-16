import { validateBatchUpdatePrices } from "@/services/productService";
import HttpException from "@/utils/HttpException";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const priceUpdates = await request.json();

  const { result, error } = await validateBatchUpdatePrices(priceUpdates);

  return NextResponse.json({ products: result, error });
}
