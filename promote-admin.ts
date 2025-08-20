import prisma from './src/utils/prismaClient';

async function promoteAdmin() {
  await prisma.user.update({
    where: { email: 'salim.dafaa@gmail.com' },
    data: { role: 'ADMIN' }
  });
  console.log('Utilisateur promu ADMIN');
  await prisma.$disconnect();
}

promoteAdmin();
