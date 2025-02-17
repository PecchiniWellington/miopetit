"use server";
import { createProduct } from "./create-product.actions";
import { deleteProduct } from "./delete-product.actions";
import { getAllProducts } from "./get-all-products.actions";
import { getFeaturedProducts } from "./get-featured-product.actions";
import { getLatestProducts } from "./get-latest-product.actions";
import { getProductById } from "./get-product-by-id.actions";
import { getProductBySlug } from "./get-product-by-slug";
import { updateProduct } from "./update-product.actions";

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getLatestProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
};
