import {
  ISignInForm,
  ISignUpForm,
  signInFormSchema,
  signUpFormSchema,
} from "./auth.validator";
import { ICart, ICartItem, cartItemSchema } from "./cart.validator";
import { ICategory, categorySchema } from "./category.validator";
import { IOrderItem } from "./order-items.validator";
import { IOrder, orderSchema } from "./orders.validator";
import {
  IPaymentMethod,
  IPaymentResult,
  paymentMethodSchema,
  paymentResultSchema,
} from "./payments.validator";
import {
  ICreateProduct,
  IProduct,
  createProductSchema,
  productSchema,
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
  ICreateProduct,
  ILatestSales,
  IOrder,
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
  IUpdateUser,
  IUpdateUserProfile,
  IUser,
};

export {
  LatestSalesSchema,
  SalesDataTypeSchema,
  cartItemSchema,
  categorySchema,
  createProductSchema,
  insertReviewSchema,
  orderSchema,
  paymentMethodSchema,
  paymentResultSchema,
  productSchema,
  reviewSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateReviewSchema,
  updateUserProfileSchema,
  updateUserSchema,
  userSchema,
};
