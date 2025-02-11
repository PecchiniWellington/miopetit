import ROLES from "@/lib/constants/roles";
import { hashSync } from "bcryptjs";

const usersData = [
  {
    name: "wellintone",
    email: "wellintone.creative@gmail.com",
    password: hashSync("123456", 10),
    role: ROLES.ADMIN,
  },
  {
    name: "wellington",
    email: "wellingtonpecchini@gmail.com",
    password: hashSync("123456", 10),
    role: ROLES.USER,
  },
  {
    name: "pekkins",
    email: "warthepekkins@gmail.com",
    password: hashSync("123456", 10),
    role: ROLES.CONTRIBUTOR,
  },
  {
    name: "soundstudio",
    email: "wellintonesoundstudion@gmail.com",
    password: hashSync("123456", 10),
    role: ROLES.EDITOR,
  },
];

export default usersData;
