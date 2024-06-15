import prisma from '@models/prisma';
import { decryptData } from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing required field: email' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await prisma.users.findMany();

    let matchedUser = null;
    for (let user of users) {
      const decryptedEmail = decryptData(user.email);
      if (decryptedEmail === normalizedEmail) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const request = await prisma.requests.findFirst({
      where: { userId: matchedUser.id, status: 'Approved' },
      include: { cards: true },
    });

    if (!request || !request.cards) {
      return res.status(404).json({ error: 'Card not found for the user' });
    }

    const card = request.cards;

    res.status(200).json({
      cardHolder: `${decryptData(matchedUser.firstName)} ${decryptData(matchedUser.lastName)}`,
      cardNumber: decryptData(card.cardNumber),
      expiry: new Date(card.expirationDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit' }),
      cvc: decryptData(card.signature),
    });
  } catch (error) {
    console.error('Error fetching card details:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
