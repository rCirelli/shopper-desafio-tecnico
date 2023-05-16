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
  const productDataWithNewPrice = await getProductsAndAppendNewPrice(priceUpdateRequest);
  return productDataWithNewPrice;
}

export async function getProductsAndAppendNewPrice(priceUpdateRequest: ProductToUpdate[]) {
  const productsToUpdate: Promise<ProductToUpdate>[] = [];
  let hasErrors = false;
  priceUpdateRequest.forEach((priceUpdate) => {
    const { code, newPrice } = validateRequest(priceUpdate);

    const productPromise = new Promise(async (resolve) => {
      const product = await findProduct(code);
      if (product.errors && product.errors.length > 0) {
        hasErrors = true;
      }
      resolve({ ...product, newPrice });
    });

    productsToUpdate.push(productPromise as Promise<ProductToUpdate>);
  });

  const result = await Promise.all(productsToUpdate);

  return { result, error: hasErrors };
}

export async function findProduct(code: Product['code']): Promise<Partial<ProductToUpdate>> {
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
    return { code: Number(code), errors: ['produto não encontrado'] }
  }

  return {
    code: Number(product.code),
    name: product.name,
    price: Number(product.salePrice),
  };
}
