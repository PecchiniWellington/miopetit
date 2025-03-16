"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import { HelpCircle, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SettingSection from "./SettingSection";

const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      name: "Google",
      connected: true,
      icon: "/google.png",
    },
    {
      id: 2,
      name: "Facebook",
      connected: false,
      icon: "/facebook.svg",
    },
    {
      id: 3,
      name: "Twitter",
      connected: true,
      icon: "/x.png",
    },
  ]);
  return (
    <SettingSection icon={HelpCircle} title={"Connected Accounts"}>
      {connectedAccounts.map((account) => (
        <div
          key={account.id}
          className="flex items-center justify-between py-3"
        >
          <div className="flex gap-1">
            <Image
              width={24}
              height={24}
              src={account.icon}
              alt="Social img"
              className="mr-2 size-6 rounded-full object-cover"
            />
            <span className="text-gray-300">{account.name}</span>
          </div>
          <BrandButton
            variant={account.connected ? "confirm" : "flat"}
            onClick={() => {
              setConnectedAccounts(
                connectedAccounts.map((acc) => {
                  if (acc.id === account.id) {
                    return {
                      ...acc,
                      connected: !acc.connected,
                    };
                  }
                  return acc;
                })
              );
            }}
          >
            {account.connected ? "Connected" : "Connect"}
          </BrandButton>
        </div>
      ))}
      <BrandButton type="submit" icon={<Plus size={18} className="mr-2" />}>
        Add Account
      </BrandButton>
    </SettingSection>
  );
};
export default ConnectedAccounts;
