import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Une seule instance partagée dans toute l'app
const prisma = new PrismaClient({ adapter });

export default prisma;
