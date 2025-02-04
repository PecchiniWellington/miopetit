import { auth } from "@/auth";
import Header from "@/components/admin-2/common/Header";
import ConnectedAccounts from "@/components/admin-2/settings/ConnectedAccounts";
import DangerZone from "@/components/admin-2/settings/DangerZone";
import Notifications from "@/components/admin-2/settings/Notifications";
import Profile from "@/components/admin-2/settings/Profile";
import Security from "@/components/admin-2/settings/Security";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title="Settings" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <Profile userLogged={session} />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingsPage;
