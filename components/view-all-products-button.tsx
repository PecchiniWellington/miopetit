import React from "react";
import Link from "next/link";
import DynamicButton from "./dynamic-button";

const ViewAllProductButton = () => {
  return (
    <div className="my-8 flex items-center justify-center">
      <DynamicButton>
        <Link href="/search">View All Product</Link>
      </DynamicButton>
    </div>
  );
};

export default ViewAllProductButton;
