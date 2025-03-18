"use client";

import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <main className="wrapper my-10 flex flex-1 items-center justify-center">
        <Image
          src="/images/loader-2.gif"
          alt="loading"
          width={400}
          height={400}
        />
      </main>
    </div>
  );
};

export default Loading;
