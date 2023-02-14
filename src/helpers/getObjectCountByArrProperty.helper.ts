/**
 * Create a object where keyProperty is the key value and the value
 * is the times that this keyProperty value is repeated inside the array.
 * @param {{[key: string]: any}[]} values - Array of values
 * @param {string} keyProperty  - Key property to count
 * @returns classified object.
 */
const getObjectCountByArrProperty = (
  values: { [key: string]: any }[],
  keyProperty: string
) =>
  values.reduce((previousValue, currentValue) => {
    previousValue[currentValue[keyProperty]] ??= 0;
    previousValue[currentValue[keyProperty]] =
      previousValue[currentValue[keyProperty]] + 1;
    return previousValue;
  }, {} as { [key: string | number]: number });

export default getObjectCountByArrProperty;
