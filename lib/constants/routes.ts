export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PRODUCT: (_id: string) => `/product/${_id}`,
};

export const USER_ROUTES = {
  ORDERS: "/user/orders",
  PROFILE: "/user/profile",
};
