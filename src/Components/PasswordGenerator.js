import PropTypes from 'prop-types';

const GeneratePassword = ({setCreatedPassword, createdPassword}) => {
  const passwordLength = 10;
  const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbersList = '0123456789';
  const symbolsList = '!@#$%^&*()?';
  const characterLists = [lowercaseList, uppercaseList,
    numbersList, symbolsList];
  let tempPassword = '';
  let i;

  const generatePassword = () => {
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
    return createdPassword;
  };

  return (
    <div className='d-flex my-3'>
      <button type='button' className="btn btn-outline-primary btn-sm "
        onClick={generatePassword}>Generate Secure Password</button>
    </div>
  );
};

GeneratePassword.propTypes = {
  setCreatedPassword: PropTypes.func,
  createdPassword: PropTypes.string,
};
export default GeneratePassword;
