export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
  EDITOR = "EDITOR",
  CONTRIBUTOR = "CONTRIBUTOR",
}

export const USER_ROLES = process.env.USER_ROES
  ? process.env.USER_ROES.split(",")
  : [ROLES.USER, ROLES.EDITOR, ROLES.CONTRIBUTOR, ROLES.ADMIN];

export default ROLES;
