import { PrismaClient } from '@prisma/client';

let prisma;

try {
    prisma = new PrismaClient();
} catch (error) {
    console.error('Error creating PrismaClient', error);
}

export default prisma;
