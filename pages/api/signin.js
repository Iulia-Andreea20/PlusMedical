import prisma from '@models/prisma';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      const secretKey = 'my-secret-key'; // Use a secure method to store and retrieve the secret key

      // Normalize the email to match it with the decrypted emails in the database
      const normalizedEmail = email.trim().toLowerCase();

      // Fetch all users from the database
      const users = await prisma.users.findMany();

      // Iterate over users and decrypt their emails to find a match
      let decryptedEmail = null;
      let matchedUser = null;
      for (let user of users) {
        decryptedEmail = CryptoJS.AES.decrypt(user.email, secretKey).toString(CryptoJS.enc.Utf8);
        if (decryptedEmail === normalizedEmail) {
          matchedUser = user;
          break;
        }
      }

      if (!matchedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the passwords
      const decryptedPassword = CryptoJS.AES.decrypt(matchedUser.password, secretKey).toString(CryptoJS.enc.Utf8);
      if (decryptedPassword !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Decrypt other user information
      const decryptedFirstName = CryptoJS.AES.decrypt(matchedUser.firstName, secretKey).toString(CryptoJS.enc.Utf8);
      const decryptedLastName = CryptoJS.AES.decrypt(matchedUser.lastName, secretKey).toString(CryptoJS.enc.Utf8);
      const decryptedPhoneNumber = CryptoJS.AES.decrypt(matchedUser.phoneNumber, secretKey).toString(CryptoJS.enc.Utf8);

      // Return the decrypted user information
      res.status(200).json({
        firstName: decryptedFirstName,
        lastName: decryptedLastName,
        email: decryptedEmail,
        phoneNumber: decryptedPhoneNumber,
      });
    } catch (error) {
      console.error('Failed to authenticate user:', error);
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
