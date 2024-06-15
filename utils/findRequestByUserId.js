import prisma from "@models/prisma";

async function findRequestByUserId(userId) {
  try {
    const request = await prisma.requests.findUnique({
      where: { userId },
      include: {
        cards: true, // Include card details in the request
      },
    });

    return request;
  } catch (error) {
    throw new Error(`Error fetching request: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { findRequestByUserId };