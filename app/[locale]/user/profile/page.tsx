import { auth } from "@/auth";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import LogoutHandler from "./logout-handler";
import ProfileTabsConfig from "./profile-tabs-config";

const ProfilePage = async () => {
  const loggedUser = await auth();
  if (!loggedUser) {
    return <LogoutHandler />;
  }
  const userId = loggedUser?.user?.id;
  const user = userId ? await getUserById(userId) : null;
  let myCart = null;
  if (!user) {
    return <LogoutHandler />; // 👈 Se l'utente non esiste, esegui il logout lato client
  } else {
    myCart = await getMyCart();
  }

  return (
    <div className=" mx-auto flex flex-col gap-8 py-6 md:flex-row md:p-6">
      {/* 📌 Sidebar */}
      <ProfileTabsConfig user={user} myCart={myCart} />
    </div>
  );
};

export default ProfilePage;
