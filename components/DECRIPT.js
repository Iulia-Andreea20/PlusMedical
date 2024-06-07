import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key'; // Use a secure method to store and retrieve the secret key

function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Example usage to fetch a user and decrypt their data
async function fetchUser(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (user) {
    user.firstName = decryptData(user.firstName);
    user.lastName = decryptData(user.lastName);
    user.email = decryptData(user.email);
    user.phoneNumber = decryptData(user.phoneNumber);
  }

  return user;
}
