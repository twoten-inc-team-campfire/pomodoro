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