import prisma from '@models/prisma';
import CryptoJS from 'crypto-js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;

      if (!firstName || !lastName || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const secretKey = 'my-secret-key'; // Use a secure method to store and retrieve the secret key

      // Normalize and encrypt the email
      const normalizedEmail = email.trim().toLowerCase();
      const encryptedEmail = CryptoJS.AES.encrypt(normalizedEmail, secretKey).toString();

      // Encrypt other data
      const encryptedFirstName = CryptoJS.AES.encrypt(firstName, secretKey).toString();
      const encryptedLastName = CryptoJS.AES.encrypt(lastName, secretKey).toString();
      const encryptedPhoneNumber = CryptoJS.AES.encrypt(phoneNumber, secretKey).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

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
