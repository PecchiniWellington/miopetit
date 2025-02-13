import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import ConnectedAccounts from "@/components/admin/settings/ConnectedAccounts";
import DangerZone from "@/components/admin/settings/DangerZone";
import Notifications from "@/components/admin/settings/Notifications";

import Security from "@/components/admin/settings/Security";
import UserProfile from "@/components/admin/settings/user-profile";
import { getUserById } from "@/core/actions/user";

const SettingsPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    // Handle the case where session or session.user.id is null or undefined
    throw new Error("User session is not valid");
  }
  const user = await getUserById(session.user.id);
  console.log("User", user);
  if (!user) {
    console.log("User not found");
    return;
  }
  return (
    <div className="relative z-10 flex-1 overflow-auto bg-gray-900">
      <Header title="Settings" />
      <main className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
        <UserProfile userLogged={user} />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingsPage;
