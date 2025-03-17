"use client";

import BrandNotFound from "@/components/shared/not-found";

const NotFoundProduct = () => {
  return (
    <BrandNotFound
      title=" Oops! Order Not Found"
      description="No order was found with that id. Please check the name and try again."
    />
  );
};

export default NotFoundProduct;
