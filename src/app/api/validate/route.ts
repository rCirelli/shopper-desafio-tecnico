import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const file = await request.body;
  // const req = await request.json();
  console.log(file);
  return NextResponse.json({ isValid: true })
}