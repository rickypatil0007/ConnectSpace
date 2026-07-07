const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const users = [
    {
      email: 'user@example.com',
      name: 'Demo User',
      role: 'user',
      password,
    },
    {
      email: 'organizer@example.com',
      name: 'Demo Organizer',
      role: 'organizer',
      password,
    },
    {
      email: 'owner@example.com',
      name: 'Demo Space Owner',
      role: 'owner',
      password,
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }

  console.log('Dummy users seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
