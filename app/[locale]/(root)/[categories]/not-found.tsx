"use client";

import BrandNotFound from "@/components/shared/not-found";

const NotFoundCategory = () => {
  return (
    <BrandNotFound
      title=" Oops! No category found with this name"
      description=" No Category was found with that name. Please check the name and try
        again."
    />
  );
};

export default NotFoundCategory;
