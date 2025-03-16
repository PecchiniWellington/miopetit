"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
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
        <BrandButton type="submit">Change Password</BrandButton>
      </div>
    </SettingSection>
  );
};
export default Security;
