const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crée un utilisateur test
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "123456"
    }
  });
  console.log("Utilisateur créé :", user);

  // Récupère tous les utilisateurs
  const users = await prisma.user.findMany();
  console.log("Tous les utilisateurs :", users);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
