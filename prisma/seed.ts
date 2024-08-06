import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = [
    { role_name: "superadmin" },
    { role_name: "admin" },
    { role_name: "employee" },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  const superAdmins = [
    {
      first_name: "Rustine Dave",
      last_name: "Lontayao",
      email: "rlontayao@puzzlehr.com",
      role_id: 1,
    },
    {
      first_name: "Joe",
      last_name: "Daggar",
      email: "jdaggar@puzzlehr.com",
      role_id: 1,
    },
  ];

  for (const superAdmin of superAdmins) {
    await prisma.user.create({
      data: superAdmin,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
