export enum ROLES {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  VETERINARIAN = "VETERINARIAN",
  VOLUNTEER = "VOLUNTEER",
  RETAILER = "RETAILER",
  USER = "USER",
}

export const USER_ROLES = process.env.USER_ROES
  ? process.env.USER_ROES.split(",")
  : [
      ROLES.USER,
      ROLES.SUPERADMIN,
      ROLES.VETERINARIAN,
      ROLES.ADMIN,
      ROLES.RETAILER,
      ROLES.VOLUNTEER,
    ];

export default ROLES;
