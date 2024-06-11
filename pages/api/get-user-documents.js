import prisma from '@models/prisma';
import path from 'path';
import { decryptData } from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const uploadDirectory = path.join(process.cwd(), 'Documents');

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Missing email parameter' });
  }

  try {
    const users = await prisma.users.findMany();
    const user = users.find(user => decryptData(user.email) === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
    });

    if (documents.length === 0) {
      return res.status(404).json({ message: 'No documents found for this user' });
    }

    const documentPaths = path.join(uploadDirectory, documents.path);
    console.log('Document paths:', documentPaths); // Debugging

    return res.status(200).json({ fileBuffer });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
