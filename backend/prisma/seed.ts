import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Nettoyer les données existantes (utile en dev)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.contactMessage.deleteMany();

  // Créer les 3 produits
  await prisma.product.createMany({
    data: [
      {
        name: "Bol en grès émaillé",
        slug: "bol-gres-emaille",
        description:
          "Bol artisanal en grès, émail brillant aux reflets bleutés. Façonné à la main au tour de potier.",
        price: 35.0,
        imageUrl:
          "https://images.unsplash.com/photo-1733459187464-29d0289750b1?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 12,
      },
      {
        name: "Vase ondulé en porcelaine",
        slug: "vase-onduleur-porcelaine",
        description:
          "Vase élégant en porcelaine blanche, finition mate, formes organiques inspirées de la nature.",
        price: 78.0,
        imageUrl:
          "https://images.unsplash.com/photo-1649669637614-511a3931b11a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 5,
      },
      {
        name: 'Mug "Soleil levant"',
        slug: "mug-soleil-levant",
        description:
          "Mug en céramique rouge terracotta, motif soleil peint à la main. Contenance 30 cl.",
        price: 22.0,
        imageUrl:
          "https://images.unsplash.com/photo-1766747021051-b2d2e8610883?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 20,
      },
    ],
  });

  // Créer quelques stages
  await prisma.workshop.createMany({
    data: [
      {
        title: "Initiation au tour de potier",
        description:
          "Découvrez les bases du tournage en argile lors d'une demi-journée conviviale.",
        date: new Date("2026-06-15T14:00:00"),
        duration: 180,
        price: 65.0,
        capacity: 6,
      },
      {
        title: "Stage week-end : du modelage à l'émaillage",
        description:
          "Deux jours immersifs pour réaliser votre propre pièce, du façonnage à la cuisson.",
        date: new Date("2026-07-04T10:00:00"),
        duration: 960,
        price: 220.0,
        capacity: 8,
      },
    ],
  });

  console.log("✅ Seeding terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
