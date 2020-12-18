/**
 * setDateToMidnight
 * @desc Sets the date passed in to midnight local time.
 * Does this get included in the public documentation?
 * @param {Date} date - The date to be set to midnight
 * @returns {Date}
 */
export function setDateToMidnight(date) {
    date.setHours(0, 0, 0, 0);
    return date;
}