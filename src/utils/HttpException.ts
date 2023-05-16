import { ApiError } from "next/dist/server/api-utils";

export default class HttpException extends ApiError {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.statusCode = statusCode;
  }
}