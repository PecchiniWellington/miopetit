import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import MenuEditor from "@/components/admin/mega-menu-config/menu-editor";
import ConnectedAccounts from "@/components/admin/settings/ConnectedAccounts";
import DangerZone from "@/components/admin/settings/DangerZone";
import Notifications from "@/components/admin/settings/Notifications";
import Profile from "@/components/admin/settings/Profile";
import Security from "@/components/admin/settings/Security";
import { getUserById } from "@/core/actions/user/user.action";

const SettingsPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    // Handle the case where session or session.user.id is null or undefined
    throw new Error("User session is not valid");
  }
  const user = await getUserById(session.user.id);
  return (
    <div className="relative z-10 flex-1 overflow-auto bg-gray-900">
      <Header title="Settings" />
      <main className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
        <Profile userLogged={user} />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
        <MenuEditor />
      </main>
    </div>
  );
};
export default SettingsPage;
