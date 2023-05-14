export type ProductCSV = {
  product_code: string;
  new_price: string;
}

export interface Product {
  code: string;
  name: string;
  price: string;
}

export interface UpdatedProduct extends Product {
  newPrice: string;
}