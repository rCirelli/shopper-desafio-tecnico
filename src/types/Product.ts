import { number } from "zod";

export type ProductCSV = {
  product_code: string;
  new_price: string;
}

export interface Product {
  code: string | number;
  name: string;
  price: string | number;
}

export interface UpdatedProduct extends Product {
  newPrice: string;
}