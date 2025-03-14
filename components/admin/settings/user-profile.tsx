"use client";
import { IUser } from "@/core/validators";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SettingSection from "./SettingSection";

const UserProfile = ({ userLogged }: { userLogged: IUser | null }) => {
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="mb-6 flex flex-col items-center sm:flex-row">
        <Image
          height={80}
          width={80}
          src={userLogged?.image ? userLogged.image : "/images/placeholder.jpg"}
          alt="Profile"
          className="mr-4 size-20 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {userLogged?.name}
          </h3>
          <p className="text-gray-400">{userLogged?.email}</p>
        </div>
      </div>

      <Link
        href={`/admin/users/${userLogged?.id}`}
        className="w-full rounded bg-indigo-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-indigo-700 sm:w-auto"
      >
        Edit Profile
      </Link>
    </SettingSection>
  );
};
export default UserProfile;
