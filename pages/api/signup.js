import prisma from '@models/prisma';
import { encryptData } from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;

      if (!firstName || !lastName || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Normalize and encrypt the email
      const normalizedEmail = email.trim().toLowerCase();
      const encryptedEmail = encryptData(normalizedEmail);

      // Encrypt other data
      const encryptedFirstName = encryptData(firstName);
      const encryptedLastName = encryptData(lastName);
      const encryptedPhoneNumber = encryptData(phoneNumber);
      const encryptedPassword = encryptData(password);

      // Find the default user role
      const userRole = await prisma.roles.findUnique({
        where: { role: 'user' }
      });

      // Create the user with encrypted data
      const newUser = await prisma.users.create({
        data: {
          firstName: encryptedFirstName,
          lastName: encryptedLastName,
          email: encryptedEmail,
          phoneNumber: encryptedPhoneNumber,
          password: encryptedPassword,
          roleId: userRole.roleId,
        },
        include: {
          role: true,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Failed to insert data:', error);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
