export type ProductCSV = {
  product_code: string;
  new_price: string;
}

export interface Product {
  code: string | number;
  name: string;
  price: number;
}

export interface ProductToUpdate {
  code: string | number;
  name?: string;
  price?: number;
  newPrice: number;
  cost?: number;
  errors: string[];
}