export const getKeyOfMaxValueInObject = (inputObject) => {
  return Object.keys(inputObject).reduce((a, b) =>
    inputObject[a] > inputObject[b] ? a : b
  );
};
