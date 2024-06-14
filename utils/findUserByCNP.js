import prisma from "@models/prisma";
import { decryptData } from "@utils/cryptoUtilitary";
import path from "path";

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
        documents: {
          include: {
            documentType: true,
          },
        },
        requests: {
          include: {
            cards: true,
          },
        },
        beneficiary: true,
        coSignerFor: true,
      },
    });

    for (let user of users) {
      if (!user.cnp) {
        continue;
      }
      else if(decryptData(user.cnp) === cnp){
        // const uploadDirectory = path.join(process.cwd(), 'Documents');
        // path.join(uploadDirectory, document.path)
        const decryptedUser = {
          id: user.id,
          firstName: decryptData(user.firstName),
          lastName: decryptData(user.lastName),
          email: decryptData(user.email),
          phoneNumber: decryptData(user.phoneNumber),
          cnp: cnp,
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
          documents: user.documents.map(document => ({
            id: document.id,
            path: document.path,
            uploadDate: document.uploadDate,
            documentType: document.documentType.name,
          })),
          requests: user.requests ? {
            id: user.requests.id,
            requestDate: user.requests.requestDate,
            status: user.requests.status,
            requestedAmount: user.requests.requestedAmount,
            cards: user.requests.cards ? {
              cardNumber: user.requests.cards.cardNumber,
              signature: user.requests.cards.signature,
              currentBalance: user.requests.cards.currentBalance,
              approvedAmount: user.requests.cards.approvedAmount,
              expirationDate: user.requests.cards.expirationDate,
            } : null,
          } : null,
          beneficiary: user.beneficiary ? {
            id: user.beneficiary.id,
            beneficiaryId: user.beneficiary.beneficiaryId,
            coSignerId: user.beneficiary.coSignerId,
          } : null,
          coSignerFor: user.coSignerFor ? {
            id: user.coSignerFor.id,
            beneficiaryId: user.coSignerFor.beneficiaryId,
            coSignerId: user.coSignerFor.coSignerId,
          } : null,
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