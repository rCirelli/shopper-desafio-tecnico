import HttpException from "@/utils/HttpException";
import prisma from "@/utils/prisma";
import { Product } from "@prisma/client";

export async function findProduct(code: Product['code']) {
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        code: code,
      },
      select: {
        code: true,
        name: true,
        salePrice: true,
      }
    });
    return {
      code: Number(product.code),
      name: product.name,
      price: product.salePrice,
    };
  } catch (error: any) {
    return new HttpException(404, error.message);
  }

}

export function batchUpdatePrices() {

}