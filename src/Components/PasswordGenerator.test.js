import {generatePassword} from './PasswordGenerator';

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = '!@#$%^&*()?';

describe('generatePassword', () => {
  it('contains at least one character from each list', () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(4*1000);
    for (let i = 0; i < 1000; i++) {
      const password = generatePassword(() => {});
      let containsLowercase = false;
      let containsUppercase = false;
      let containsNumber = false;
      let containsSymbol = false;

      for (let j = 0; j < password.length; j++) {
        const character = password.charAt(j);
        if (lowercaseList.includes(character)) {
          containsLowercase = true;
        } else if (uppercaseList.includes(character)) {
          containsUppercase = true;
        } else if (numbersList.includes(character)) {
          containsNumber = true;
        } else if (symbolsList.includes(character)) {
          containsSymbol = true;
        }
      }

      expect(containsLowercase).toBe(true);
      expect(containsUppercase).toBe(true);
      expect(containsNumber).toBe(true);
      expect(containsSymbol).toBe(true);
    }
  });
});
