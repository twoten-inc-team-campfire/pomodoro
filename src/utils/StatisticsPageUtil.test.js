import {TimerSession, TIMER_SESSION_TYPE} from "../classes/TimerSession";
import {fitTimerSessionsIntoRange} from "./StatisticsPageUtil";

export function timerSessionsTestData() {
    return [
        new TimerSession (
            new Date(2020, 10, 11, -1, 35, 0, 0),
            new Date(2020, 10, 11, -1, 50, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Mwahaha, I've snuck in even though I'm not in range at all!"
        ),
        new TimerSession (
            new Date(2020, 10, 11, -1, 55, 0, 0),
            new Date(2020, 10, 11, 0, 20, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
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
            new Date(2020, 10, 11, 24, 5, 0, 0),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date(2020, 10, 11, 24, 10, 50, 100),
            new Date(2020, 10, 11, 24, 15, 49, 99),
            TIMER_SESSION_TYPE.POMODORO,
            "Shhhh, I don't actually belong here...."
        ),
    ];
}

describe("fitTimerSessionsIntoRange correctly fits TimerSessions into the specified range", () => {
    test("All TimerSessions returned from fitTimerSessionsInRange should fall within range", () => {
        const timerSessions = timerSessionsTestData();
        const startDate = new Date(2020, 10, 11,0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12,0, 0, 0, 0);
        let fittedTimerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        for (const timerSession of fittedTimerSessions) {
            expect(startDate <= timerSession.startTime).toBeTruthy();
            expect(startDate <= timerSession.endTime).toBeTruthy();
            expect(timerSession.startTime <= endDate).toBeTruthy();
            expect(timerSession.endTime <= endDate).toBeTruthy();
        }
    })
    test("TimerSessions that are returned should be in the same order", () => {
        let timerSessions = timerSessionsTestData();
        for (let i = 0; i < timerSessions.length; i += 1) {
            timerSessions[i].task = i.toString();
        }
        const startDate = new Date(2020, 10, 11,0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12,0, 0, 0, 0);
        const correctTimerSessionTasks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
        let fittedTimerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        expect(fittedTimerSessions.length).toEqual(correctTimerSessionTasks.length);
        for (let i = 0; i < fittedTimerSessions.length; i += 1)
            expect(fittedTimerSessions[i].task).toEqual(correctTimerSessionTasks[i])
    })
    test("If some TimerSessions fall completely outside the range, they should be removed", () => {
        const timerSessions = timerSessionsTestData();
        const startDate = new Date(2020, 10, 11,0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12,0, 0, 0, 0);
        const timerSessionBeforeRange = timerSessions[0];
        const timerSessionAfterRange = timerSessions[timerSessions.length - 1];
        let fittedTimerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        expect(fittedTimerSessions).toEqual(
            expect.not.arrayContaining([timerSessionBeforeRange])
        );
        expect(fittedTimerSessions).toEqual(
            expect.not.arrayContaining([timerSessionAfterRange])
        );
    })
    test("If some TimerSessions straddle the range, they should be shortened to fit in the range", () => {
        const timerSessions = timerSessionsTestData();
        const startDate = new Date(2020, 10, 11,0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12,0, 0, 0, 0);
        let timerSessionBeginningOfRange = timerSessions[1].copy();
        timerSessionBeginningOfRange.startTime = new Date(startDate);
        let timerSessionEndOfRange = timerSessions[timerSessions.length - 2].copy();
        timerSessionEndOfRange.endTime = new Date(endDate);
        let fittedTimerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        expect(fittedTimerSessions).toContainEqual(timerSessionBeginningOfRange);
        expect(fittedTimerSessions).toContainEqual(timerSessionEndOfRange);
    })
    test("If a single TimerSessions straddles the entire range, both start and end should be changed", () => {
        const timerSessions = [
            new TimerSession(
                new Date(2020, 10, 11, -1, 1, 1, 1),
                new Date(2020, 10, 12, 2, 2, 2, 2),
                TIMER_SESSION_TYPE.POMODORO,
                "The typical work schedule of a grad student, amiright?"
            )
        ];
        const startDate = new Date(2020, 10, 11,0, 0, 0, 0);
        const endDate = new Date(2020, 10, 12,0, 0, 0, 0);
        let fixedTimerSession = timerSessions[0].copy();
        fixedTimerSession.startTime = new Date(startDate);
        fixedTimerSession.endTime = new Date(endDate);
        let fittedTimerSessions = fitTimerSessionsIntoRange(timerSessions, startDate, endDate);
        expect(fittedTimerSessions[0]).toEqual(fixedTimerSession);
    })
})