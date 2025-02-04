"use client";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import Image from "next/image";
import Link from "next/link";

const Profile = ({ userLogged }: any) => {
  {
    console.log(userLogged);
  }
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <Image
          height={80}
          width={80}
          src={userLogged.image || "/images/placeholder.jpg"}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {userLogged.name}
          </h3>
          <p className="text-gray-400">{userLogged.email}</p>
        </div>
      </div>

      <Link
        href={`/admin/users/${userLogged.id}`}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Edit Profile
      </Link>
    </SettingSection>
  );
};
export default Profile;
