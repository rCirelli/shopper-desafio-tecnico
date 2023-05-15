import { z } from 'zod';

export const PriceUpdateRequest = z.object({
  code: z.bigint({
    required_error: "Product code is required",
    invalid_type_error: "Product code is invalid",
  }).positive(),
  newPrice: z.number({
    required_error: "New price is required",
    invalid_type_error: "New price bust be a decimal number",
  }),
});