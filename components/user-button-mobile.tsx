import { useState, useEffect } from "react";
import UserButton from "./shared/header/user-button";
const UserButtonMobile = () => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/cookies")
      .then((res) => res.json())
      .then((data) => setSessionToken(data.sessionToken));
  }, []);
  return (
    <div>
      <div className="mt-auto">
        <UserButton />
      </div>
    </div>
  );
};

export default UserButtonMobile;
