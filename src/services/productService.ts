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
      const product = await findProduct(code, newPrice);

      const validatedProduct = validateProductUpdate(product);

      if (validatedProduct.errors.length > 0) {
        hasErrors = true;
      }

      resolve({ ...validatedProduct, newPrice });
    });

    productsToUpdate.push(productPromise as Promise<ProductToUpdate>);
  });

  const result = await Promise.all(productsToUpdate);

  return { result, error: hasErrors };
}

function validateProductUpdate(product: ProductToUpdate): ProductToUpdate {
  const validatedProduct = product;
  const oldPrice = product.price ?? 0;
  const adjustRate = Math.abs(((product.newPrice - oldPrice) / oldPrice) * 100);

  if (product.cost && product.newPrice < product.cost) {
    validatedProduct.errors?.push('o preço não pode ser menor que o custo');
  }

  if (product.price && adjustRate > 10) {
    validatedProduct.errors?.push('o preço não pode ter reajuste de mais de 10%');
  }

  return validatedProduct;
}

export async function findProduct(code: Product['code'], newPrice: number): Promise<ProductToUpdate> {
  const product = await prisma.product.findUnique({
    where: {
      code: code,
    },
    select: {
      code: true,
      name: true,
      salePrice: true,
      costPrice: true,
    }
  });

  const result: ProductToUpdate = {
    code: Number(code),
    name: product?.name ?? '',
    cost: Number(product?.costPrice) ?? 0,
    price: Number(product?.salePrice) ?? 0,
    newPrice,
    errors: [],
  }

  if (!product) {
    return { ...result, errors: ['produto não encontrado'] }
  }

  return result;
}
