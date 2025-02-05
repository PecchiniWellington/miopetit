"use client";
import { Lock } from "lucide-react";
import { useState } from "react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <SettingSection icon={Lock} title={"Security"}>
      <ToggleSwitch
        label={"Two-Factor Authentication"}
        isOn={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}
      />
      <div className="mt-4">
        <button
          className="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition 
        duration-200 hover:bg-indigo-700
        "
        >
          Change Password
        </button>
      </div>
    </SettingSection>
  );
};
export default Security;
