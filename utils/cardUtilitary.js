import crypto from 'crypto';

/**
 * Generates a valid VISA card number.
 * @returns {string} A valid VISA card number.
 */
export const generateVisaCardNumber = () => {
  // Generate 15 random digits (as the first digit is fixed to '4' for VISA)
  let cardNumber = '4' + Array.from({length: 14}, () => Math.floor(Math.random() * 10)).join('');
  cardNumber += getLuhnCheckDigit(cardNumber);
  return cardNumber;
};

/**
 * Calculates the Luhn check digit for a given card number.
 * @param {string} cardNumber - The card number without the check digit.
 * @returns {string} The Luhn check digit.
 */
const getLuhnCheckDigit = (cardNumber) => {
  let sum = 0;
  let shouldDouble = true;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (10 - (sum % 10)) % 10;
};

/**
 * Generates a three-digit CVV.
 * @returns {string} A three-digit CVV.
 */
export const generateSignature = () => {
  return Math.floor(100 + Math.random() * 900).toString(); // Generate a three-digit CVV
};
