"use client";
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
          <button
            className={`rounded px-3 py-1 ${
              account.connected
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            } transition duration-200`}
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
          </button>
        </div>
      ))}
      <button className="mt-4 flex items-center text-indigo-400 transition duration-200 hover:text-indigo-300">
        <Plus size={18} className="mr-2" /> Add Account
      </button>
    </SettingSection>
  );
};
export default ConnectedAccounts;
