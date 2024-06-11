import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Dezactivează bodyParser-ul implicit pentru a putea folosi formidable
  },
};

const uploadDirectory = path.join(process.cwd(), 'uploads'); // Specifică directorul unde vrei să salvezi fișierele

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024, // Limita de 5MB
    filter: ({ mimetype }) => mimetype === 'application/pdf',
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    console.log('Parsed files:', files); // Log pentru debugging

    try {
      const file = files.file[0]; // Accesăm primul element din array
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Citirea fișierului direct în memorie
      const filePath = file.filepath || file.path;
      console.log('File path:', filePath); // Log pentru debugging
      if (!filePath) {
        return res.status(400).json({ error: 'Invalid file path' });
      }

      const fileBuffer = await fs.readFile(filePath);

      // Salvarea fișierului pe disc
      await fs.mkdir(uploadDirectory, { recursive: true }); // Creează folderul dacă nu există
      const newFilePath = path.join(uploadDirectory, `${Date.now()}_${file.originalFilename}`);
      await fs.writeFile(newFilePath, fileBuffer);

      res.status(200).json({ message: 'File uploaded successfully', filePath: newFilePath });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
