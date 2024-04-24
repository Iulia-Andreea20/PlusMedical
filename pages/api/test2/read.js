// pages/api/test2/read.js
import prisma from '@components/prisma'; // Adjust the path to your prisma instance accordingly

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const test2Records = await prisma.test.findMany();
      res.status(200).json(test2Records);
    } catch (error) {
      console.error('Failed to retrieve records:', error);
      res.status(500).json({ error: "Failed to retrieve records" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
