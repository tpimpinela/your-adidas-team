/**
 * Convert day to miliseconds.
 * @param {number} days - Number of days
 * @returns {number} number of miliseconds
 */
const daysToMiliseconds = (days: number) => days * 24 * 60 * 60 * 1000;

export default daysToMiliseconds;
