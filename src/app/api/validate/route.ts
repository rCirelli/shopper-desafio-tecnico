import { validatePriceUpdate } from "@/services/validations/priceUpdate";
import HttpException from "@/utils/HttpException";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const priceUpdates = await request.json();
  
  try {
    const result = await validatePriceUpdate(priceUpdates);
    
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof HttpException) {
      return NextResponse.json({ status: error.status, message: error.message });
    }
  }
}
