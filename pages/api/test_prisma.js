// Import the PrismaClient constructor from the @prisma/client node module
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newPost = await prisma.prismaTEST.create({
        data: {
          title: 'Prisma is awesome!',
        },
      });
      res.status(201).json(newPost);
    } catch (e) {
      console.error('Request error', e);
      res.status(500).json({ error: 'Error creating post' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
