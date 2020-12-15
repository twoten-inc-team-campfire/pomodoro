/**
 * getDateMinutes
 * @desc Returns the formatted minute (mm) for a given date.
 * @param {Date} date - Returns the formatted minute from this date.
 * @example
 * // returns 06
 * date.setHours(3, 6, 5, 0)
 * getDateHour(date);
 * @returns {string}
 */
export function getDateMinutes(date) {
    let minute = date.getMinutes().toString();
    minute = minute.padStart(2, "0");
    return minute;
}

/**
 * getDateHour
 * @desc Returns the formatted hour (hh) for a given date.
 * @param {Date} date - Returns the formatted hour from this date.
 * @example
 * // returns 03
 * date.setHours(3, 6, 5, 0)
 * getDateHour(date);
 * @returns {string}
 */
export function getDateHours(date) {
    let hour = date.getHours().toString();
    hour = hour.padStart(2, "0");
    return hour;
}

/**
 * shiftDate
 * @desc Shifts a given Date object by the number of days given in the offset.
 * @param {Date} date - The date to be shifted.
 * @param {number} offset - The number of days to shift the date forward or backward.
 * @returns {Date}
 * @ignore
 */
export function shiftDate(date, offset) {
    let shiftedDate = new Date(date);
    shiftedDate.setDate(date.getDate() + offset);
    return shiftedDate;
}

/**
 * dateToHtmlDateSting
 * @desc Outputs a string representing a date in a format compatible with HTML input elements that work with dates.
 * @param {Date} date - The date to be converted to a string for use in an HTML date input field.
 * @returns {string}
 */
export function dateToHtmlDateString(date) {
    // HTML expects the day and month to be exactly 2 characters long and the year to be exactly 4 characters long.
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JS indexes months 0 - 11, so we must increment.
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * htmlDateStringToDate
 * @desc Reads a date string in the format used by an HTML date input and outputs the corresponding JS Date object.
 * @param {string} str - The string representing a date that we want to convert into a Date object.
 * @returns {Date}
 */
export function htmlDateStringToDate(str) {
    let substrs = str.split('-');
    return new Date(parseInt(substrs[0]), parseInt(substrs[1])-1, parseInt(substrs[2]), 0, 0, 0, 0);
}