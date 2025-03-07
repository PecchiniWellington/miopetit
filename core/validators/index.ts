import {
  ISignInForm,
  ISignUpForm,
  signInFormSchema,
  signUpFormSchema,
} from "./auth.validator";
import {
  ICart,
  ICartItem,
  cartItemSchema,
  insertCartSchema,
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
  IProduct,
  IUpdateProduct,
  insertProductSchema,
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
  ICategory,
  ICategoryInsert,
  ICategoryUpdate,
  IInsertProduct,
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
  orderSchema,
  paymentMethodSchema,
  paymentResultSchema,
  productSchema,
  reviewSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateCategorySchema,
  updateProductSchema,
  updateReviewSchema,
  updateUserProfileSchema,
  updateUserSchema,
  userSchema,
};
