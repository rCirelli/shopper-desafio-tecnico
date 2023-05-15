import { batchUpdatePrices } from "@/services/productService";
import HttpException from "@/utils/HttpException";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const priceUpdates = await request.json();

  const result = await batchUpdatePrices(priceUpdates);

  if (result instanceof HttpException) {
    return new NextResponse(result.message, { status: result.statusCode });
  }

  return NextResponse.json('ok');
}
