import { ProductToUpdate } from "@/types/Product";
import HttpException from "@/utils/HttpException";
import prisma from "@/utils/prisma";
import { Product } from "@prisma/client";
import { validateRequest } from "./validations/priceUpdate";

export async function batchUpdatePrices(priceUpdateRequest: ProductToUpdate[]) {
  const updates = priceUpdateRequest.map((product) => {
    const { code, newPrice } = validateRequest(product);

    return prisma.product.update({
      where: { code: code },
      data: { salePrice: newPrice }
    });
  });

  const result = await Promise.all(updates).catch((error) => error);

  if (result instanceof HttpException) {
    throw result;
  }

  return result;
}

export async function validateBatchUpdatePrices(priceUpdateRequest: ProductToUpdate[]) {
  try {
    const productDataWithNewPrice = await getProductsAndAppendNewPrice(priceUpdateRequest);
    return productDataWithNewPrice;
  } catch (error) {
    return error;
  }
}

export async function getProductsAndAppendNewPrice(priceUpdateRequest: ProductToUpdate[]) {
  const productsToUpdate: Array<Promise<ProductToUpdate>> = [];

  priceUpdateRequest.forEach((priceUpdate) => {
    const { code, newPrice } = validateRequest(priceUpdate);

    const productPromise = new Promise(async (resolve, reject) => {
      try {
        const product = await findProduct(code) as unknown as Product;
        resolve({ ...product, newPrice });
      } catch (error) {
        reject(error);
      }

    });

    productsToUpdate.push(productPromise as Promise<ProductToUpdate>);
  });

  const result = await Promise.all(productsToUpdate).catch((error) => error);

  if (result instanceof HttpException) {
    throw result;
  }

  return result;
}

export async function findProduct(code: Product['code']): Promise<Partial<ProductToUpdate>> {
  // try {
  const product = await prisma.product.findUnique({
    where: {
      code: code,
    },
    select: {
      code: true,
      name: true,
      salePrice: true,
    }
  });
  if (!product) {
    return { code: Number(code), errors: ['product not found'] }
  }

  return {
    code: Number(product.code),
    name: product.name,
    price: Number(product.salePrice),
  };
  // } catch (error: any) {
  //   throw new HttpException(404, `product: ${code}, not found`);
  // }
}
