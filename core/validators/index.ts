import {
  ISignInForm,
  ISignUpForm,
  signInFormSchema,
  signUpFormSchema,
} from "./auth.validator";
import {
  ICart,
  ICartItem,
  ICartUpdate,
  cartItemSchema,
  insertCartSchema,
  updateCartSchema,
} from "./cart.validator";
import {
  ICategory,
  ICategoryInsert,
  ICategoryUpdate,
  categorySchema,
  insertCategorySchema,
  updateCategorySchema,
} from "./category.validator";
import {
  IOrder,
  IOrderInsert,
  IOrderItem,
  insertOrderItemSchema,
  insertOrderSchema,
  orderSchema,
} from "./orders.validator";
import {
  IPaymentMethod,
  IPaymentResult,
  paymentMethodSchema,
  paymentResultSchema,
} from "./payments.validator";
import {
  IInsertProduct,
  ILatestProduct,
  IProduct,
  IUpdateProduct,
  insertProductSchema,
  latestProductSchema,
  productSchema,
  updateProductSchema,
} from "./product.validator";
import {
  IReview,
  IReviewInsert,
  IReviewUpdate,
  insertReviewSchema,
  reviewSchema,
  updateReviewSchema,
} from "./reviews.validator";
import {
  ILatestSales,
  ISalesDataType,
  LatestSalesSchema,
  SalesDataTypeSchema,
} from "./sales.validator";
import { IShippingAddress, shippingAddressSchema } from "./shipping.validator";
import {
  IUpdateUser,
  IUpdateUserProfile,
  IUser,
  updateUserProfileSchema,
  updateUserSchema,
  userSchema,
} from "./user.validator";

export type {
  ICart,
  ICartItem,
  ICartUpdate,
  ICategory,
  ICategoryInsert,
  ICategoryUpdate,
  IInsertProduct,
  ILatestProduct,
  ILatestSales,
  IOrder,
  IOrderInsert,
  IOrderItem,
  IPaymentMethod,
  IPaymentResult,
  IProduct,
  IReview,
  IReviewInsert,
  IReviewUpdate,
  ISalesDataType,
  IShippingAddress,
  ISignInForm,
  ISignUpForm,
  IUpdateProduct,
  IUpdateUser,
  IUpdateUserProfile,
  IUser,
};

export {
  LatestSalesSchema,
  SalesDataTypeSchema,
  cartItemSchema,
  categorySchema,
  insertCartSchema,
  insertCategorySchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertReviewSchema,
  latestProductSchema,
  orderSchema,
  paymentMethodSchema,
  paymentResultSchema,
  productSchema,
  reviewSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateCartSchema,
  updateCategorySchema,
  updateProductSchema,
  updateReviewSchema,
  updateUserProfileSchema,
  updateUserSchema,
  userSchema,
};
