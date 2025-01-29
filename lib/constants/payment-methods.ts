import ROLES from "./roles";

export const PAYMENT_METHODS_TYPE = {
  PAYPAL: "PayPal",
  CASH_ON_DELIVERY: "CashOnDelivery",
  STRIPE: "Stripe",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : [
      PAYMENT_METHODS_TYPE.PAYPAL,
      PAYMENT_METHODS_TYPE.CASH_ON_DELIVERY,
      PAYMENT_METHODS_TYPE.STRIPE,
    ];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || PAYMENT_METHODS_TYPE.PAYPAL;

export default ROLES;
