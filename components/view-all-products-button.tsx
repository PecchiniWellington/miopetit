import React from "react";
import Link from "next/link";
import DynamicButton from "./dynamic-button";

const ViewAllProductButton = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <DynamicButton>
        <Link href="/search">View All Product</Link>
      </DynamicButton>
    </div>
  );
};

export default ViewAllProductButton;
