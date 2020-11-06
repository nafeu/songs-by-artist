export const getKeyOfMaxValueInObject = inputObject => {
  const keys = Object.keys(inputObject);
  return keys.reduce((a, b) => {
    return inputObject[a] > inputObject[b] ? a : b;
  }, null);
};
