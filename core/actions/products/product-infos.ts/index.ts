"use server";
import {
  getAllBrands,
  getProductBrandByProductId,
} from "./get-product-brand.action";
import { getAllFeatures } from "./get-product-features.action";
import { getAllFormats } from "./get-product-formats.action";
import {
  getAllPathologies,
  getProductPathologyByProductId,
} from "./get-product-patologies.action";
import {
  getAllProtein,
  getProteinByProductId,
} from "./get-product-proteins.action";

export {
  getAllBrands,
  getAllFeatures,
  getAllFormats,
  getAllPathologies,
  getAllProtein,
  getProductBrandByProductId,
  getProductPathologyByProductId,
  getProteinByProductId,
};
