import prisma from '@models/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, nume, prenume } = req.body;

    try {
      const updatedPerson = await prisma.test.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nume,
          prenume,
        },
      });

      res.status(200).json(updatedPerson);
    } catch (error) {
      console.error('Error updating person:', error);
      res.status(500).json({ error: 'Error updating person' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
