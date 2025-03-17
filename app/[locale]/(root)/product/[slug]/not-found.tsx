"use client";

import BrandNotFound from "@/components/shared/not-found";

const NotFoundProduct = () => {
  return (
    <BrandNotFound
      title=" Oops! Product Not Found"
      description=" No product was found with that name. Please check the name and try
        again."
    />
  );
};

export default NotFoundProduct;
