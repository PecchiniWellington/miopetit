import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ViewAllProductButton = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <Button
        variant="outline"
        asChild
        className="px-8 py-4 text-lg font-semibold"
      >
        <Link href="/search">View All Product</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductButton;
