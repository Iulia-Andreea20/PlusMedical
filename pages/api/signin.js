import prisma from '@models/prisma';
import { decryptData } from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const users = await prisma.users.findMany();

      // Iterate over users and decrypt their emails to find a match
      let decryptedEmail = null;
      let matchedUser = null;
      for (let user of users) {
        decryptedEmail = decryptData(user.email);
        if (decryptedEmail === normalizedEmail) {
          matchedUser = user;
          break;
        }
      }

      if (!matchedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the passwords
      const decryptedPassword = decryptData(matchedUser.password);
      if (decryptedPassword !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Decrypt other user information
      const decryptedFirstName = decryptData(matchedUser.firstName);
      const decryptedLastName = decryptData(matchedUser.lastName);
      const decryptedPhoneNumber = decryptData(matchedUser.phoneNumber);
      const role = await prisma.roles.findUnique({
        where: { roleId: matchedUser.roleId },
      });
      
      const request = await prisma.requests.findUnique({
        where: { userId: matchedUser.id },
      });

      // Return the decrypted user information
      res.status(200).json({
        firstName: decryptedFirstName,
        lastName: decryptedLastName,
        email: decryptedEmail,
        phoneNumber: decryptedPhoneNumber,
        role: role.role,
        requestStatus: request ? request.status : null,
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
