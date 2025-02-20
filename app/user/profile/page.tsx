import { auth } from "@/auth";
import { getUserById } from "@/core/actions/user";
import { Heart, Lock, MapPin, ShoppingBag, User } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import ProfileTabsConfig from "./profile-tabs-config";

const tabs = [
  { id: "profile", label: "Profilo", icon: <User className="size-5" /> },
  { id: "orders", label: "Ordini", icon: <ShoppingBag className="size-5" /> },
  { id: "favorites", label: "Preferiti", icon: <Heart className="size-5" /> },
  { id: "addresses", label: "Indirizzi", icon: <MapPin className="size-5" /> },
  { id: "security", label: "Sicurezza", icon: <Lock className="size-5" /> },
];

const ProfilePage = async () => {
  const loggedUser = await auth();
  if (!loggedUser) {
    return <div>User not logged in</div>;
  }
  const userId = loggedUser?.user?.id;
  const user = userId ? await getUserById(userId) : null;
  if (!user) {
    return <div>User not available</div>;
  }

  return (
    <div className=" mx-auto flex flex-col gap-8 py-6 md:flex-row md:p-6">
      {/* 📌 Sidebar */}
      <SessionProvider>
        <ProfileTabsConfig tabs={tabs} user={user} />
      </SessionProvider>
    </div>
  );
};

export default ProfilePage;
