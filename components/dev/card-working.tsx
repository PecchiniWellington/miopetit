import React from "react";

const CardWorking = ({ children }: any) => {
  return (
    <div className="relative">
      {children}
      <div className="rounded-xl absolute inset-0   flex items-center justify-center text-white ">
        <div className="text-white text-2xl font-semibold rounded-xl">
          WORKING...
        </div>
        <div className=" rounded-xl opacity-55 bg-red-900 absolute inset-0"></div>
      </div>
    </div>
  );
};

export default CardWorking;
