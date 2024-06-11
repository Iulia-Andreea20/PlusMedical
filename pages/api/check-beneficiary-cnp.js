
import prisma from '@models/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { cnp } = req.body;
  
      try {
        const beneficiary = await prisma.users.findUnique({
          where: { cnp },
        });
  
        if (beneficiary) {
          res.status(200).json({ exists: true });
        } else {
          res.status(404).json({ exists: false });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }