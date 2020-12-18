/**
 * setDateToMidnight
 * @desc Sets the date passed in to midnight local time.
 * @param {Date} date - The date to be set to midnight
 * @returns {Date}
 */
export function setDateToMidnight(date) {
    date.setHours(0, 0, 0, 8);
    return date;
}