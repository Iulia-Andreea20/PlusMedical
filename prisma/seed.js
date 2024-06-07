const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      { role: 'admin' },
      { role: 'user' },
    ],
    skipDuplicates: true,
  });

  console.log('Roles created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
