import prisma from "@models/prisma";

async function findRequestByUserId(userId) {
  try {
    const requests = await prisma.requests.findMany();

    for (let request of requests) {
      if (request.userId === userId) {
        return request;
      }
    }

  } catch (error) {
    throw new Error(`Error fetching request: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { findRequestByUserId };