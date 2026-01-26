import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const prismaClientSingleton = () => {
    return new PrismaClient({
        adapter: new PrismaPg(pool),
    });
};

const globalForPrisma = globalThis as unknown as {
    prisma?: ReturnType<typeof prismaClientSingleton>;
};

export const prisma = 
globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}