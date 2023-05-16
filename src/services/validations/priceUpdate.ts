import { ProductToUpdate } from "@/types/Product";
import { PriceUpdateRequest } from "./schemas/priceUpdate.schema";

export function validateRequest(priceUpdateRequest: ProductToUpdate) {
  const code = BigInt(priceUpdateRequest.code);
  const newPrice = Number(priceUpdateRequest.newPrice);
  return PriceUpdateRequest.parse({ code, newPrice });
}
