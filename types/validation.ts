import type { Product } from "~~/types/product";

export interface ValidationError {
  productId: number;
  field: "count" | "price" | "color";
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateProducts(products: Product[]): ValidationResult {
  const errors: ValidationError[] = [];

  products.forEach((product) => {
    if (
      product.count === null ||
      product.count === undefined ||
      product.count === 0 ||
      isNaN(product.count as number)
    ) {
      errors.push({
        productId: product.id,
        field: "count",
      });
    } else if (typeof product.count === "number" && product.count % 1 !== 0) {
      errors.push({
        productId: product.id,
        field: "count",
      });
    }

    // цена
    if (
      product.price === null ||
      product.price === undefined ||
      product.price === 0
    ) {
      errors.push({
        productId: product.id,
        field: "price",
      });
    }

    // цвет
    if (!product.color || product.color === "Select" || product.color === "") {
      errors.push({
        productId: product.id,
        field: "color",
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
