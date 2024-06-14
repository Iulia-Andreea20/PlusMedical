import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDirectory = path.join(process.cwd(), 'Documents');

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }

  try {
    const fullPath = path.join(uploadDirectory, fileName);

    try {
      await fs.access(fullPath);
    } catch (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileBuffer = await fs.readFile(fullPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${fileName}`);

    // Trimite fișierul ca răspuns
    res.status(200).send(fileBuffer);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
