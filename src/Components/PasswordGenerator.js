import PropTypes from 'prop-types';

const passwordLength = 14;
const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = '!@#$%^&*()?';
// eslint-disable-next-line max-len
const characterLists = [lowercaseList, uppercaseList, numbersList, symbolsList];

export const generatePassword = (setCreatedPassword, createdPassword) => {
  let tempPassword = '';
  let i;
  for (i = 0; i < characterLists.length; i++) {
    const characterList = characterLists[i];
    const characterIndex = Math.floor(Math.random() * characterList.length);
    tempPassword += characterList.charAt(characterIndex);
  }

  for (i = characterLists.length; i < passwordLength; i++) {
    const characterList = characterLists[Math.floor(
        Math.random() * characterLists.length)];
    const characterIndex = Math.floor(Math.random() * characterList.length);
    tempPassword += characterList.charAt(characterIndex);
  }
  setCreatedPassword(tempPassword);
  return tempPassword;
};

const GeneratePassword = ({setCreatedPassword, createdPassword}) => {
  const handleClick = () => {
    generatePassword(setCreatedPassword, createdPassword);
  };

  return (
    <div className='d-flex my-3'>
      <button type='button' className="btn btn-outline-primary btn-sm "
        onClick={handleClick}>Generate Secure Password</button>
    </div>
  );
};

GeneratePassword.propTypes = {
  setCreatedPassword: PropTypes.func,
  createdPassword: PropTypes.string,
};
export default GeneratePassword;
