import { Permission } from "@prisma/client";

export const generatePermissionsByRole = (userId: string, role: string) => {
  const rolePermissions: Record<string, Permission[]> = {
    ADMIN: [
      "VIEW_ANIMALS",
      "EDIT_ANIMALS",
      "VIEW_ADOPTIONS",
      "EDIT_ADOPTIONS",
      "VIEW_INVENTORY",
      "EDIT_INVENTORY",
    ],
    VETERINARIAN: ["VIEW_ANIMALS", "EDIT_ANIMALS", "VIEW_VOLUNTEERS"],
    VOLUNTEER: ["VIEW_ANIMALS", "VIEW_ADOPTIONS"],
    RETAILER: ["VIEW_INVENTORY", "EDIT_INVENTORY"],
  };
  return (rolePermissions[role] || []).map((permission) => ({
    userId,
    permission,
  }));
};
