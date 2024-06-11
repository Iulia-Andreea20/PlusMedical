// utils/changeHandlers.js
import { validateFile } from '@utils/qualityChecks';

export const handleFileChange = (event, setFileErrors, setFormErrors) => {
  const file = event.target.files[0];
  const { name } = event.target;
  const errors = {};

  const fileError = validateFile(file, name);
  if (fileError) {
    errors[name] = fileError;
  }

  setFileErrors(prevErrors => ({ ...prevErrors, ...errors }));
  if (Object.keys(errors).length === 0) {
    setFormErrors(prevErrors => {
      const { [name]: _, ...rest } = prevErrors;
      return rest;
    });
  }
};

export const handleInputChange = (event, setFormErrors) => {
  const { name, value } = event.target;
  setFormErrors(prevErrors => {
    const newErrors = { ...prevErrors };
    if (value) {
      delete newErrors[name];
    }
    return newErrors;
  });
};

export const handleCheckboxChange = (event, setIsGuarantor, setFormErrors) => {
  const { checked } = event.target;
  setIsGuarantor(checked);
  if (!checked) {
    setFormErrors(prevErrors => {
      const { beneficiaryCNP, ...rest } = prevErrors;
      return rest;
    });
  }
};
