import prisma from '@models/prisma';
import { generateVisaCardNumber, generateSignature } from '@utils/cardUtilitary';
import { encryptData} from '@utils/cryptoUtilitary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, status, approvedAmount, rejectedReason } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'Missing required fields: id or status' });
  }

  try {
    let updateRequestData = {};
    let cardData = null;
    
    if (status === 'Approved') {
      if (!approvedAmount) {
        return res.status(400).json({ error: 'Approved amount is required for approval' });
      }
      updateRequestData = {
        status,
        updatedStatus: new Date(),
        rejectedReason: null,
      };
      cardData = {
        requestId: parseInt(id),
        userId: (await prisma.requests.findUnique({ where: { id: parseInt(id) } })).userId,
        cardNumber: encryptData(generateVisaCardNumber()),
        signature: encryptData(generateSignature()),
        currentBalance: encryptData(approvedAmount.toString()),
        approvedAmount: encryptData(approvedAmount.toString()),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
      };

      const existingCard = await prisma.cards.findUnique({
        where: { requestId: parseInt(id) },
      });

      if (!existingCard) {
        await prisma.cards.create({
          data: cardData,
        });
      }
      else {
        await prisma.cards.update({
            where: { requestId: parseInt(id) },
            data: cardData,
        });
      }

    } else if (status === 'Rejected') {
      if (!rejectedReason) {
        return res.status(400).json({ error: 'Rejection reason is required for rejection' });
      }
      updateRequestData = {
        status,
        updatedStatus: new Date(),
        rejectedReason: encryptData(rejectedReason),
      };
    }

    const updatedRequest = await prisma.requests.update({
      where: { id: parseInt(id) },
      data: updateRequestData,
    });

    return res.status(200).json({ message: 'Request updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
