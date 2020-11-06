import { getKeyOfMaxValueInObject } from './helpers';

describe('getKeyOfMaxValueInObject', () => {
  test('should get key for item with highest number', () => {
    const exampleObject = {
      'a': 1,
      'b': 2
    }

    expect(getKeyOfMaxValueInObject(exampleObject)).toBe('b');
  });

  test('should return null for empty object', () => {
    const exampleObject = {}

    expect(getKeyOfMaxValueInObject(exampleObject)).toBe(null);
  });

  test('should return some key for matched top value', () => {
    const exampleObject = {
      'a': 1,
      'b': 2,
      'c': 2
    }

    const someKey = getKeyOfMaxValueInObject(exampleObject);

    expect(exampleObject[someKey]).toBe(2);
  });

  test('should omit non numbers where a number exists', () => {
    const exampleObject = {
      'a': null,
      'b': 'asdf',
      'c': 1
    }

    expect(getKeyOfMaxValueInObject(exampleObject)).toBe("c");
  });
});