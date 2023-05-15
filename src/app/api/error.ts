import HttpException from "@/utils/HttpException";
import { NextResponse } from "next/server";

export { errorHandler };

function errorHandler(err: Error) {
    if (err instanceof HttpException) {
        return new NextResponse(err.message, {
            status: err.statusCode,
        });
    }
    // default to 500 server error
    console.error("=======error handler=======\n", err);
    return new NextResponse(err.message, {
        status: 500,
    });
}