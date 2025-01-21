const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PRODUCT: (_id: string) => `/product/${_id}`,
};

export default ROUTES;
