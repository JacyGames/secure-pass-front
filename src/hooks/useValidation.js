import {useState, useEffect} from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [digitError, setDigitError] = useState(false);
  const [upperCaseError, setUpperCaseError] = useState(false);
  const [symbolError, setSymbolError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() =>{
    // eslint-disable-next-line guard-for-in
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
value.length < validations[validation] ? setMinLength(true) :
setMinLength(false);
          break;
        case 'isEmpty':
value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'isEmail':
          const re =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
re.test(String(value).toLowerCase()) ? setEmailError(false) :
setEmailError(true);
          break;
        case 'isDigit':
          const reDigit = /[0-9]/;
reDigit.test(value) ? setDigitError(false) :
setDigitError(true);
          break;
        case 'isUpperCase':
          const reUpperCase = /[A-Z]/;
reUpperCase.test(value) ? setUpperCaseError(false) :
setUpperCaseError(true);
          break;
        case 'isSymbol':
          const reSymbol = /[^a-zA-Z0-9]/;
reSymbol.test(value) ? setSymbolError(false) :
setSymbolError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    // eslint-disable-next-line max-len
    if (isEmpty || minLength || emailError || digitError || upperCaseError || symbolError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, emailError, digitError, upperCaseError, symbolError]);

  return {
    isEmpty,
    minLength,
    emailError,
    digitError,
    upperCaseError,
    symbolError,
    inputValid,
  };
};
