import {getTimerSessionsTimeBlocks, getPercentIntoRange, TimelineGraph} from "./TimelineGraph";
import {timerSessionsInSingleDay} from "../../test_data/TimerSession";
import {TIMER_SESSION_TYPE, TimerSession} from "../../classes/TimerSession";

function timerSessionsTestData() {
    return [
        new TimerSession (
            new Date(2020, 10, 11, 0, 0, 0, 0),
            new Date(2020, 10, 11, 0, 20, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Hey, I no longer straddle two dates!"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 0, 20, 0, 0),
            new Date(2020, 10, 11, 0, 25, 0, 0),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Whew, base cases are hard work!"
        ),
        new TimerSession(
            new Date(2020, 10, 11, 13, 35, 0, 0),
            new Date(2020, 10, 11, 14, 0,0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Making sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 14, 0, 0, 0),
            new Date(2020, 10, 11, 14, 5, 0, 0),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Making sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 14, 7, 0, 0),
            new Date(2020, 10, 11, 14, 17, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Making samples of sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 14, 20, 30, 0),
            new Date(2020, 10, 11, 14, 29, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Making samples of sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 14, 30, 0, 0),
            new Date(2020, 10, 11, 14, 35, 0, 0),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Sampling the samples of sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 14, 35, 0, 0),
            new Date(2020, 10, 11, 15, 0, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Sampling sample dates for samples of sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 15, 0, 0, 0),
            new Date(2020, 10, 11, 15, 15, 0, 0),
            TIMER_SESSION_TYPE.LONG_REST,
            "Whew, sampling sample sample data wears me out"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 15, 30, 0, 0),
            new Date(2020, 10, 11, 15, 55, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Confusing people trying to read my sample data"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 22, 57, 45, 0),
            new Date(2020, 10, 11, 23, 22, 15, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date(2020, 10, 11,23, 30, 0, 0),
            new Date(2020, 10, 11,23, 35, 0, 0),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 23, 40, 0, 0),
            new Date(2020, 10, 11, 23, 59, 59, 999),
            TIMER_SESSION_TYPE.POMODORO,
            "Hey, I no longer straddle two days!"
        )
    ];
}

function timeBlocksTestData() {
    return [
        {
            startTime: (new Date(2020, 10, 11, 0, 0, 0, 0)).getTime(),
            endTime: (new Date(2020, 10, 11, 0, 25, 0, 0)).getTime()
        },
        {
            startTime: (new Date(2020, 10, 11, 13, 35, 0, 0)).getTime(),
            endTime: (new Date(2020, 10, 11, 15, 15, 0, 0)).getTime(),
        },
        {
            startTime: (new Date(2020, 10, 11, 15, 30, 0, 0)).getTime(),
            endTime: (new Date(2020, 10, 11, 15, 55, 0, 0)).getTime()
        },
        {
            startTime: (new Date(2020, 10, 11, 22, 57, 45, 0)).getTime(),
            endTime: (new Date(2020, 10, 11, 23, 59, 59, 999)).getTime()
        }
    ];
}

describe("getTimerSessionsTimeBlocks should compress timer sessions into consecutive blocks of time", () => {
    test("getTimerSessionsTimeBlocks should compress timer sessions within the allowed gap", () => {
        const timerSessions = timerSessionsTestData();
        // First, test a gap of 20 minutes
        const timeBlocks20 = getTimerSessionsTimeBlocks(timerSessions, 20);
        const correctTimeBlocks20 = [
            {
                startTime: (new Date(2020, 10, 11, 0, 0, 0, 0)).getTime(),
                endTime: (new Date(2020, 10, 11, 0, 25, 0, 0)).getTime()
            },
            {
                startTime: (new Date(2020, 10, 11, 13, 35, 0, 0)).getTime(),
                endTime: (new Date(2020, 10, 11, 15, 55, 0, 0)).getTime()
            },
            {
                startTime: (new Date(2020, 10, 11, 22, 57, 45, 0)).getTime(),
                endTime: (new Date(2020, 10, 11, 23, 59, 59, 999)).getTime()
            }];
        expect(timeBlocks20).toEqual(correctTimeBlocks20);
        // Then, test a gap of 10 minutes
        const timeBlocks10 = getTimerSessionsTimeBlocks(timerSessions, 10);
        const correctTimeBlocks10 = timeBlocksTestData();
        expect(timeBlocks10).toEqual(correctTimeBlocks10);
    })
    test("getTimerSessionsTimeBlocks should handle that case where it receives an empty array", () => {
        const timerSessions = [];
        const timeBlocks = getTimerSessionsTimeBlocks(timerSessions, 20);
        expect(timeBlocks).toEqual([]);
    })
    test("getTimerSessionsTImeBlocks should handle the case where every TimerSession fits in one block",() => {
        const timerSessions = timerSessionsTestData();
        const timeBlocks = getTimerSessionsTimeBlocks(timerSessions, 60 * 24);
        const correctTimeBlocks = [{
            startTime: (new Date(2020, 10, 11, 0, 0, 0, 0)).getTime(),
            endTime: (new Date(2020, 10, 11, 23, 59, 59, 999)).getTime()
        }];
        expect(timeBlocks).toEqual(correctTimeBlocks);
    })
})

describe("getPercentIntoRange should correctly return the percentage that a timeblock takes up in a range",() => {
    test("", () => {
        const timeBlocks = timeBlocksTestData();
        const startDate = new Date(2020, 10, 11, 0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12, 0, 0, 0, 0);
        const timeBlocksInRange = getPercentIntoRange(timeBlocks, startDate, endDate);
        const correctTimeBlocksInRange = [
            {
                startTime: 0,
                endTime: 25/1440
            },
            {
                startTime: 815 / 1440,
                endTime: 915 / 1440
            },
            {
                startTime: 930 / 1440,
                endTime: 955 / 1440
            },
            {
                startTime: 82665 / 86400,
                endTime: 86399999/86400000
            }
        ];
        expect(timeBlocksInRange).toEqual(correctTimeBlocksInRange);
    })
})