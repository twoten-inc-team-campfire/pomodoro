/**
 * fitTimerSessionsInRange
 * @desc Takes a list of TimerSessions and strips it down to only TimerSessions that fit within the range,
 *  splitting
 * @param {TimerSession[]} timerSessions - A list of non-overlapping TimerSessions sorted by startTime
 * @param {Date} startDate - The earliest allowed date/time in the range
 * @param {Date} endDate - The latest allowed date/time in the range
 * @returns {TimerSession[]}
 */
export function fitTimerSessionsIntoRange(timerSessions, startDate, endDate) {
    let trimmedTimerSessions = [];
    let i = 0
    while (i < timerSessions.length && timerSessions[i].endTime < startDate) {
        i += 1
    }
    if (i === timerSessions.length) {
        return [];
    } else if (timerSessions[i].startTime < startDate) {
        let trimmedSession = timerSessions[i].copy();
        trimmedSession.startTime = new Date(startDate);
        trimmedTimerSessions.push(trimmedSession);
    } else {
        trimmedTimerSessions.push(timerSessions[i]);
    }
    i += 1
    while (i < timerSessions.length && timerSessions[i].startTime < endDate) {
        trimmedTimerSessions.push(timerSessions[i]);
        i += 1;
    }
    if (trimmedTimerSessions[trimmedTimerSessions.length - 1].endTime > endDate) {
        let trimmedSession = trimmedTimerSessions[trimmedTimerSessions.length - 1].copy();
        trimmedSession.endTime = new Date(endDate);
        trimmedTimerSessions[trimmedTimerSessions.length - 1] = trimmedSession;
    }
    return trimmedTimerSessions;
}