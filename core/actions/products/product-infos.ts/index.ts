"use server";
import {
  getAllBrands,
  getProductBrandByProductId,
} from "./get-product-brand.action";
import {
  getAllFeatures,
  getFeaturesBrandByProductId,
} from "./get-product-features.action";
import { getAllFormats } from "./get-product-formats.action";
import {
  getAllPathologies,
  getProductPatologyByProductId,
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
  getFeaturesBrandByProductId,
  getProductBrandByProductId,
  getProductPatologyByProductId,
  getProteinByProductId,
};
