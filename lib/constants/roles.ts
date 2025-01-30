const ROLES = {
  ADMIN: "admin",
  USER: "user",
  EDITOR: "editor",
  CONTRIBUTOR: "contributor",
};

export const USER_ROLES = process.env.USER_ROES
  ? process.env.USER_ROES.split(",")
  : [ROLES.USER, ROLES.EDITOR, ROLES.CONTRIBUTOR, ROLES.ADMIN];

export default ROLES;
