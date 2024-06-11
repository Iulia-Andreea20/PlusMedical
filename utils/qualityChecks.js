export const validateForm = (data, isGuarantor) => {
    const errors = {};
  
    // Validate CNP
    const cnp = data.get('cnp');
    if (!cnp) {
      errors.cnp = 'CNP is required.';
    } else if (!/^\d{13}$/.test(cnp)) {
      errors.cnp = 'CNP must be exactly 13 digits.';
    }
  
    // Validate other required fields
    const requiredFields = ['country', 'province', 'city', 'street', 'number', 'incomeStatement', 'idCopy', 'requestedAmount'];
    requiredFields.forEach(field => {
      if (!data.get(field)) {
        errors[field] = 'This field is required.';
      }
    });
  
    // Validate number field
    const number = data.get('number');
    if (number && !/^\d+$/.test(number)) {
      errors.number = 'Number must be a numeric value.';
    }
  
    // Validate requested amount
    const requestedAmount = data.get('requestedAmount');
    if (requestedAmount && !/^\d+$/.test(requestedAmount)) {
      errors.requestedAmount = 'Requested amount must be numeric.';
    } else if (requestedAmount && parseInt(requestedAmount) < 5000) {
      errors.requestedAmount = 'The minimum loan amount is 5000 RON.';
    }
  
    // Validate apartment field
    const ap = data.get('ap');
    if (ap && !/^\d+$/.test(ap)) {
      errors.ap = 'Apartment Number must be a numeric value.';
    }
  
    // Validate Beneficiary CNP if the checkbox is checked
    if (isGuarantor) {
      const beneficiaryCNP = data.get('beneficiaryCNP');
      if (!beneficiaryCNP) {
        errors.beneficiaryCNP = 'Beneficiary CNP is required.';
      } else if (!/^\d{13}$/.test(beneficiaryCNP)) {
        errors.beneficiaryCNP = 'Beneficiary CNP must be exactly 13 digits.';
      } else if (beneficiaryCNP === cnp) {
        errors.beneficiaryCNP = 'Beneficiary CNP must be different from Personal CNP.';
      }
    }
  
    // Validate file uploads
    const incomeStatement = data.get('incomeStatement');
    const idCopy = data.get('idCopy');
  
    if (incomeStatement && incomeStatement.type !== 'application/pdf') {
      errors.incomeStatement = 'This field is required.';
    } else if (incomeStatement && incomeStatement.size > 5 * 1024 * 1024) {
      errors.incomeStatement = 'Income statement file size should be less than 5MB.';
    }
  
    if (idCopy && idCopy.type !== 'application/pdf') {
      errors.idCopy = 'This field is required.';
    } else if (idCopy && idCopy.size > 5 * 1024 * 1024) {
      errors.idCopy = 'ID copy file size should be less than 5MB.';
    }
  
    return errors;
  };
  