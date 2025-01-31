"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useCountdown from "@/hooks/use-countdown";
import DynamicButton from "./dynamic-button";

// Static date for the countdown (replace with desired date)
const TARGET_DATE = new Date("2025-04-31T23:59:59");

const StatBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <li className="p-4 w-full text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p>{label}</p>
    </li>
  );
};

const DealCountdown = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  if (days === null) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Deal Has Ended</h3>
          <p>
            This deal is no longer available. Check out our latest promotions
          </p>

          <div className="text-center">
            <DynamicButton>
              <Link href="/search">View Products</Link>
            </DynamicButton>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/promo.jpg"
            alt="promotion"
            width={300}
            height={300}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Deal Of The Month</h3>
        <p>
          Laboris quis aliqua anim consequat pariatur ut amet magna in nulla
          magna. Elit id excepteur Lorem aliquip ipsum ullamco. Labore tempor
          occaecat et dolor magna velit do qui veniam fugiat laborum et. Laboris
          deserunt deserunt eiusmod dolor ea dolor laboris. Pariatur est velit
          ea sunt fugiat elit cupidatat et velit.
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={days} />
          <StatBox label="Hours" value={hours} />
          <StatBox label="Minutes" value={minutes} />
          <StatBox label="Second" value={seconds} />
        </ul>
        <div className="text-center">
          <DynamicButton>
            <Link href="/search">View Products</Link>
          </DynamicButton>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/promo.jpg"
          alt="promotion"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default DealCountdown;
