import { UpdatedProduct } from "@/types/Product";
import { PriceUpdateRequest } from "./schemas/priceUpdate.schema";
import { findProduct } from "../productService";
import { Product } from "@/types/Product";
import HttpException from "@/utils/HttpException";

export async function validatePriceUpdate(priceUpdates: UpdatedProduct[]) {
  try {
    const productsToUpdate: Array<Promise<Partial<Product>> | HttpException> = [];

    priceUpdates.forEach((priceUpdate) => {
      const code = BigInt(priceUpdate.code);
      const newPrice = Number(priceUpdate.newPrice);
      PriceUpdateRequest.parse({ code, newPrice });

      const productPromise: Promise<Partial<Product>> | HttpException = findProduct(code) as unknown as Promise<Partial<Product>>;

      productsToUpdate.push(productPromise);
    });

    return Promise.all(productsToUpdate);

  } catch (error: any) {
    return new HttpException(400, error.message);
  }
}