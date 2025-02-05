import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between mb-10 flex-col space-x-2 space-y-2 md:flex-row">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                `p-2 w-56 rounded-full text-center text-sm  ${
                  index === current
                    ? "text-green-600 bg-green-100"
                    : index <= current
                      ? "text-grey-400 bg-black bg-opacity-5"
                      : "text-green-300 bg-green-100"
                }`
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <hr className="mx-2 w-16 border-t border-gray-300" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
