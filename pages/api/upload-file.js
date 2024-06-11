import prisma from '@models/prisma';
import { encryptData } from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { requestId, fileContent, fileType } = req.body;

  try {
    const request = await prisma.requests.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await prisma.documents.create({
      data: {
        documentTypeId: fileType === 'incomeStatement' ? 1 : 2, // Asumând că 1 este pentru income statement și 2 pentru ID copy
        uploadDate: new Date(),
        userId: request.userId,
        content: encryptData(fileContent),
      },
    });

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
