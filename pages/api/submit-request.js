const {findUserByCNP} = require("@utils/findUserByCNP");
import formidable from 'formidable';
import prisma from '@models/prisma'; 
import { encryptData, decryptData } from '@utils/cryptoUtilitary'; 
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDirectory = path.join(process.cwd(), 'Documents');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({
    multiples: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
    filter: ({ mimetype }) => mimetype === 'application/pdf',
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const jsonData = fields.jsonData;
    if (!jsonData) {
      return res.status(400).json({ message: 'Missing jsonData field' });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(jsonData);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return res.status(400).json({ message: 'Invalid JSON data' });
    }

    const { cnp, email, address, requestedAmount, isGuarantor, beneficiaryCNP } = parsedData;

    if (!cnp || !email || !address || !requestedAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const users = await prisma.users.findMany();
      const user = users.find(user => decryptData(user.email) === email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const encryptedCNP = encryptData(cnp);
      const encryptedStreet = encryptData(address.street);
      const encryptedNumber = encryptData(address.number);
      const encryptedBlock = address.block ? encryptData(address.block) : null;
      const encryptedStaircase = address.staircase ? encryptData(address.staircase) : null;
      const encryptedApartment = address.apartment ? encryptData(address.apartment) : null;

      await prisma.users.update({
        where: { id: user.id },
        data: { cnp: encryptedCNP },
      });

      const country = await prisma.country.upsert({
        where: { name: address.country },
        update: {},
        create: { name: address.country },
      });

      const province = await prisma.province.upsert({
        where: { name: address.province },
        update: { countryId: country.id },
        create: { name: address.province, countryId: country.id },
      });

      const locality = await prisma.locality.upsert({
        where: { name: address.city },
        update: { provinceId: province.id },
        create: { name: address.city, provinceId: province.id },
      });

      await prisma.address.create({
        data: {
          userId: user.id,
          localityId: locality.id,
          street: encryptedStreet,
          number: encryptedNumber,
          block: encryptedBlock,
          staircase: encryptedStaircase,
          apartment: encryptedApartment,
          province: address.province,
          country: address.country,
        },
      });

      const documentTypes = {
        incomeStatement: 1,
        idCopy: 2,
      };

      for (const fileKey of Object.keys(files)) {
        const file = files[fileKey][0];
        const filePath = file.filepath || file.path;
        const fileBuffer = await fs.readFile(filePath);
      
        await fs.mkdir(uploadDirectory, { recursive: true });
        const newFilePath = path.join(uploadDirectory, `${Date.now()}_${file.originalFilename}`);
        const nameFile = `${Date.now()}_${file.originalFilename}`
        await fs.writeFile(newFilePath, fileBuffer);
      
        await prisma.document.create({
          data: {
            userId: user.id,
            documentTypeId: documentTypes[fileKey],
            path: encryptData(nameFile),
          },
        });
      }

      const request = await prisma.requests.create({
        data: {
          userId: user.id,
          requestedAmount: requestedAmount,
          status: 'Pending',
        },
      });

      const beneficiaryData = await findUserByCNP(beneficiaryCNP);
      if (isGuarantor && beneficiaryData) {
        if (!beneficiaryData.cnp) {
          return res.status(400).json({ message: 'Beneficiary CNP does not exist' });
        }

        await prisma.beneficiaryCoSigners.create({

          data: {
            beneficiaryId: beneficiaryData.id,
            coSignerId: user.id,
          },
        });

      await prisma.users.update({
        where: {id: user.id},
        data: {
          coSigner: true,
        }
      });
    }
      return res.status(200).json({ message: 'Request submitted successfully', requestId: request.id });
    } catch (error) {
      console.error('Internal server error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
}
