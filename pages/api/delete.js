import prisma from '@components/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { nume, prenume } = req.body;

    try {
      const deletedPerson = await prisma.test.deleteMany({
        where: {
          nume,
          prenume,
        },
      });

      res.status(200).json(deletedPerson);
    } catch (error) {
      console.error('Error deleting person:', error);
      res.status(500).json({ error: 'Error deleting person' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
