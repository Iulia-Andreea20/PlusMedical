import prisma from '@models/prisma';
console.log(prisma); 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nume, prenume } = req.body;
      const newEntry = await prisma.test.create({
        data: {
          nume,
          prenume
        }
      });
      res.status(200).json(newEntry);
    } catch (error) {
      console.error("Failed to insert data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
