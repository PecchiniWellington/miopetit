import { faker } from "@faker-js/faker";
import { Role } from "@prisma/client";
import { hashSync } from "bcryptjs";

const roles: Role[] = [
  "USER",
  "ADMIN",
  "VOLUNTEER",
  "VETERINARIAN",
  "RETAILER",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usersData = async (): Promise<any[]> => {
  const passwordHash = hashSync("password123", 10);
  const superAdminPasswordHash = hashSync("superadmin123", 10);

  const superAdmin = {
    name: "Super Admin",
    email: "superadmin@miopetit.com",
    emailVerified: new Date(),
    image: "https://i.pravatar.cc/150?u=superadmin",
    password: superAdminPasswordHash,
    role: Role.SUPER_ADMIN, // oppure puoi usare un ruolo custom come "SUPER_ADMIN" se lo supporti nel tuo schema
    paymentMethod: "manual",
    status: "ACTIVE",
    resetToken: null,
    resetTokenExpiry: null,
    defaultAddress: {
      street: "Via dei Super Admin, 1",
      city: "Admin City",
      zipCode: "00000",
      country: "Italia",
    },
    userSlug: "super-admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const randomUsers = Array.from({ length: 30 }).map((_, i) => {
    const role = faker.helpers.arrayElement(roles);
    const name = faker.person.fullName();
    const email = faker.internet.email({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
    });

    return {
      name,
      email,
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      password: passwordHash,
      role,
      paymentMethod: faker.finance.transactionType(),
      status: "ACTIVE",
      resetToken: null,
      resetTokenExpiry: null,
      defaultAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        country: "Italia",
      },
      userSlug: faker.helpers.slugify(name.toLowerCase()) + i,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  return [superAdmin, ...randomUsers];
};

export default usersData;
