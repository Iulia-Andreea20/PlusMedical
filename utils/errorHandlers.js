import { validateCNP, validateRequiredFields, validateNumericField, validateRequestedAmount, validateFile, validateGuarantorCNP } from '@utils/qualityChecks';

export const handleErrors = async (data, isGuarantor, checkBeneficiaryCNP) => {
  const errors = {};

  // Validate CNP
  const cnp = data.get('cnp');
  errors.cnp = validateCNP(cnp);

  // Validate other required fields
  const requiredFields = ['country', 'province', 'city', 'street', 'number', 'incomeStatement', 'idCopy', 'requestedAmount'];
  Object.assign(errors, validateRequiredFields(data, requiredFields));

  // Validate number field
  errors.number = validateNumericField('Number', data.get('number'));

  // Validate requested amount
  errors.requestedAmount = validateRequestedAmount(data.get('requestedAmount'));

  // Validate apartment field
  errors.ap = validateNumericField('Apartment Number', data.get('ap'));

  // Validate Guarantor CNP if the checkbox is checked
  if (isGuarantor) {
    const guarantorCNP = data.get('beneficiaryCNP');
    errors.beneficiaryCNP = await validateGuarantorCNP(guarantorCNP, cnp, checkBeneficiaryCNP);
  }

  // Validate file uploads
  errors.incomeStatement = validateFile(data.get('incomeStatement'), 'Income Statement');
  errors.idCopy = validateFile(data.get('idCopy'), 'ID Copy');

  // Filter out null values
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key];
  });

  return errors;
};