const crypto = require('crypto');
require('dotenv').config();

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;


// Function to encrypt data
function encryptData(data) {
  if (data == null) { 
    throw new Error('Encryption error: null sau undefined string');
  }
  try {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  } catch (error) {
    throw new Error('Encryption error: ' + error.message);
  }
}

// Function to decrypt data
function decryptData(data) {
  if (data == null) {
    throw new Error('Decryption error: null sau undefined string');
  }
  try {
    const buffer = Buffer.from(data, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error('Decryption error: ' + error.message);
  }
}

module.exports = { encryptData, decryptData };
