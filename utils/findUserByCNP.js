import prisma from "@models/prisma";
import { decryptData } from "@utils/cryptoUtilitary";

async function findUserByCNP(cnp) {
  try {
    const users = await prisma.users.findMany({
      include: {
        addresses: {
          include: {
            locality: {
              include: {
                province: {
                  include: {
                    country: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    for (let user of users) {
      if (!user.cnp) {
        continue;
      }
      else if(decryptData(user.cnp) === cnp){
        const decryptedUser = {
          id: user.id,
          firstName: decryptData(user.firstName),
          lastName: decryptData(user.lastName),
          email: decryptData(user.email),
          phoneNumber: decryptData(user.phoneNumber),
          cnp: decryptData(user.cnp),
          addresses: user.addresses.map(address => ({
            street: decryptData(address.street),
            number: decryptData(address.number),
            block: address.block ? decryptData(address.block) : null,
            staircase: address.staircase ? decryptData(address.staircase) : null,
            apartment: address.apartment ? decryptData(address.apartment) : null,
            locality: address.locality.name,
            province: address.locality.province.name,
            country: address.locality.province.country.name,
          })),
        };
        return decryptedUser;
      }
    }
    return null;


  } catch (error) {
    throw new Error(`Error fetching UserId: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { findUserByCNP };