import prisma from "@models/prisma";
import { decryptData } from "@utils/cryptoUtilitary";

async function findUserIdByEmail(email) {
  try {
    const users = await prisma.users.findMany();
    let decryptedEmail = null;
    let userId = null;
    for (let user of users) {
      decryptedEmail = decryptData(user.email);
      if (decryptedEmail === email) {
        userId = user.id;
        break;
      }
    }

    return userId;
  } catch (error) {
    throw new Error(`Error fetching UserId: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { findUserIdByEmail };