import { IAnimalAge } from "./animal-age.validator";
import { ISignInForm, ISignUpForm } from "./auth.validator";
import { ICart, ICartItem, ICartUpdate } from "./cart.validator";
import { ICategory, ICategoryUpdate } from "./category.validator";
import { IOrder, IOrderInsert, IOrderItem } from "./orders.validator";
import { IPaymentMethod, IPaymentResult } from "./payments.validator";
import { IInsertProduct, IProduct, IUpdateProduct } from "./product.validator";
import { IReview, IReviewUpdate } from "./reviews.validator";
import { ILatestSales, ISalesDataType } from "./sales.validator";
import { IShippingAddress } from "./shipping.validator";

export type {
  IAnimalAge,
  ICart,
  ICartItem,
  ICartUpdate,
  ICategory,
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
  IReviewUpdate,
  ISalesDataType,
  IShippingAddress,
  ISignInForm,
  ISignUpForm,
  IUpdateProduct,
};
