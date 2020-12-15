import React from 'react';
import { render, screen } from '@testing-library/react';
import { getTimerCyclesFromTimerSessions, getTotalTimeWorked, DailyLogSession } from "./DailyLogSession";
import {TIMER_SESSION_TYPE, TimerSession} from "../../classes/TimerSession";
import {getDateHours, getDateMinutes} from "../../utils/DateUtil";

function timerSessionsLongTestData() {
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

function timerSessionsShortTestData() {
    return [
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
        )
    ];
}

function timerCyclesShortTestData() {
    return [
        {
            startTime: new Date(2020, 10, 11, 14, 7, 0, 0),
            endTime: new Date(2020, 10, 11, 14, 29, 0, 0),
            type: TIMER_SESSION_TYPE.POMODORO,
            tasks: ["Making samples of sample data"],
            // 3 minutes, 30 seconds
            pauseTime: 3 * 60 * 1000 + 30 * 1000
        },
        {
            startTime: new Date(2020, 10, 11, 14, 30, 0, 0),
            endTime: new Date(2020, 10, 11, 14, 35, 0, 0),
            type: TIMER_SESSION_TYPE.SHORT_REST,
            tasks: ["Sampling the samples of sample data"],
            pauseTime: 0
        },
        {
            startTime: new Date(2020, 10, 11, 14, 35, 0, 0),
            endTime: new Date(2020, 10, 11, 15, 0, 0, 0),
            type: TIMER_SESSION_TYPE.POMODORO,
            tasks: ["Sampling sample dates for samples of sample data"],
            pauseTime: 0
        },
        {
            startTime: new Date(2020, 10, 11, 15, 0, 0, 0),
            endTime: new Date(2020, 10, 11, 15, 15, 0, 0),
            type: TIMER_SESSION_TYPE.LONG_REST,
            tasks: ["Whew, sampling sample sample data wears me out"],
            pauseTime: 0
        },
        {
            startTime: new Date(2020, 10, 11, 15, 30, 0, 0),
            endTime: new Date(2020, 10, 11, 15, 55, 0, 0),
            type: TIMER_SESSION_TYPE.POMODORO,
            tasks: ["Confusing people trying to read my sample data"],
            pauseTime: 0
        },
    ];
}

describe("getTotalTimeWorked should correctly return the time worked", () => {
    test("The function should correctly return no time for an empty input", () => {
        const timerSessions = [];
        const timeWorked = 0;
        const res = getTotalTimeWorked(timerSessions);
        expect(res).toEqual(timeWorked);
    })
    test("The function should correctly return no time if there are no work sessions", () => {
        const timerSessions = [
            new TimerSession (
                new Date(2020, 10, 11, 14, 0, 0, 0),
                new Date(2020, 10, 11, 14, 5, 0, 0),
                TIMER_SESSION_TYPE.SHORT_REST,
                "Making sample data"
            ),
            new TimerSession (
                new Date(2020, 10, 11, 14, 30, 0, 0),
                new Date(2020, 10, 11, 14, 35, 0, 0),
                TIMER_SESSION_TYPE.SHORT_REST,
                "Sampling the samples of sample data"
            ),
            new TimerSession (
                new Date(2020, 10, 11, 15, 0, 0, 0),
                new Date(2020, 10, 11, 15, 15, 0, 0),
                TIMER_SESSION_TYPE.LONG_REST,
                "Whew, sampling sample sample data wears me out"
            ),
            new TimerSession (
                new Date(2020, 10, 11,23, 30, 0, 0),
                new Date(2020, 10, 11,23, 35, 0, 0),
                TIMER_SESSION_TYPE.SHORT_REST,
                "Testing component's ability to handle samples that straddle two dates"
            )
        ];
        const timeWorked = 0;
        const res = getTotalTimeWorked(timerSessions);
        expect(res).toEqual(timeWorked);
    })
    test("The function should correctly return the amount of time if there are work sessions", () => {
        const timerSessions = timerSessionsLongTestData();
        // Total time worked: 2 hours, 37 minutes, 59 seconds, 999 ms
        const timeWorked = 2 * 60 * 60 * 1000 + 37 * 60 * 1000 + 59 * 1000 + 999;
        const res = getTotalTimeWorked(timerSessions);
        expect(res).toEqual(timeWorked);
    })
})

describe("getTimerCyclesFromTimerSessions should compress an array of Timer Sessions into correct \
Timer Cycles", () => {

    function testTimerCyclesEquality(actualCycles, expectedCycles) {
        expect(actualCycles.length).toEqual(expectedCycles.length)
        for (let i = 0; i < actualCycles.length; i += 1) {
            expect(actualCycles[i].startTime).toEqual(expectedCycles[i].startTime);
            expect(actualCycles[i].endTime).toEqual(expectedCycles[i].endTime);
            expect(actualCycles[i].type).toEqual(expectedCycles[i].type);
            expect(actualCycles[i].tasks).toEqual(expectedCycles[i].tasks);
            expect(actualCycles[i].pauseTime).toEqual(expectedCycles[i].pauseTime);
        }
    }

    test("The function should correctly return no Timer Cycles for an empty input array", () => {
        const timerSessions = [];
        const correctTimerCycles = [];
        const timerCycles = getTimerCyclesFromTimerSessions(timerSessions);
        expect(timerCycles).toEqual(correctTimerCycles);
    })
    test("The function should correctly return a single Timer Cycle if all TimerSessions are of the same type", () => {
        const timerSessions = [
            new TimerSession (
                new Date(2020, 10, 11, 0, 0, 0, 0),
                new Date(2020, 10, 11, 0, 20, 0, 0),
                TIMER_SESSION_TYPE.POMODORO,
                "Hey, I no longer straddle two dates!"
            ),
            new TimerSession(
                new Date(2020, 10, 11, 13, 35, 0, 0),
                new Date(2020, 10, 11, 14, 0,0, 0),
                TIMER_SESSION_TYPE.POMODORO,
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
                new Date(2020, 10, 11, 14, 35, 0, 0),
                new Date(2020, 10, 11, 15, 0, 0, 0),
                TIMER_SESSION_TYPE.POMODORO,
                "Sampling sample dates for samples of sample data"
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
        ];
        const correctTimerCycles = [{
                startTime: new Date(2020, 10, 11, 0, 0, 0, 0),
                endTime: new Date(2020, 10, 11, 23, 22, 15, 0),
                type: TIMER_SESSION_TYPE.POMODORO,
                tasks: ["Hey, I no longer straddle two dates!", "Making sample data", "Making samples of sample data",
                    "Sampling sample dates for samples of sample data", "Confusing people trying to read my sample data",
                    "Testing component's ability to handle samples that straddle two dates"],
                // 21 hours, 4 minutes, 15 seconds, 0 ms
                pauseTime: 21 * 60 * 60 * 1000 + 4 * 60 * 1000 + 15 * 1000,
            }];
        const timerCycles = getTimerCyclesFromTimerSessions(timerSessions);
        testTimerCyclesEquality(timerCycles, correctTimerCycles);
    })
    test("The function should correctly return the Timer Cycles for given Timer Sessions", () => {
        const timerSessions = timerSessionsShortTestData();
        const correctTimerCycles = timerCyclesShortTestData();
        const timerCycles = getTimerCyclesFromTimerSessions(timerSessions);
        testTimerCyclesEquality(timerCycles, correctTimerCycles);
    })
    test("The function should be able to handle some of the TimerSessions missing tasks", () => {
        const timerSessions = [
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
                null
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
                null
            ),
            new TimerSession (
                new Date(2020, 10, 11, 15, 0, 0, 0),
                new Date(2020, 10, 11, 15, 15, 0, 0),
                TIMER_SESSION_TYPE.LONG_REST,
                "Whew, sampling sample sample data wears me out"
            ),
            new TimerSession (
                new Date(2020, 10, 11, 15, 30, 0, 0),
                new Date(2020, 10, 11, 15, 45, 0, 0),
                TIMER_SESSION_TYPE.POMODORO,
                null
            ),
            new TimerSession (
                new Date(2020, 10, 11, 15, 45, 0, 0),
                new Date(2020, 10, 11, 15, 55, 0, 0),
                TIMER_SESSION_TYPE.POMODORO,
                "Confusing people trying to read my sample data"
            )
        ];
        const correctTimerCycles = [
            {
                startTime: new Date(2020, 10, 11, 14, 7, 0, 0),
                endTime: new Date(2020, 10, 11, 14, 29, 0, 0),
                type: TIMER_SESSION_TYPE.POMODORO,
                tasks: ["Making samples of sample data"],
                // 3 minutes, 30 seconds
                pauseTime: 3 * 60 * 1000 + 30 * 1000
            },
            {
                startTime: new Date(2020, 10, 11, 14, 30, 0, 0),
                endTime: new Date(2020, 10, 11, 14, 35, 0, 0),
                type: TIMER_SESSION_TYPE.SHORT_REST,
                tasks: ["Sampling the samples of sample data"],
                pauseTime: 0
            },
            {
                startTime: new Date(2020, 10, 11, 14, 35, 0, 0),
                endTime: new Date(2020, 10, 11, 15, 0, 0, 0),
                type: TIMER_SESSION_TYPE.POMODORO,
                tasks: [],
                pauseTime: 0
            },
            {
                startTime: new Date(2020, 10, 11, 15, 0, 0, 0),
                endTime: new Date(2020, 10, 11, 15, 15, 0, 0),
                type: TIMER_SESSION_TYPE.LONG_REST,
                tasks: ["Whew, sampling sample sample data wears me out"],
                pauseTime: 0
            },
            {
                startTime: new Date(2020, 10, 11, 15, 30, 0, 0),
                endTime: new Date(2020, 10, 11, 15, 55, 0, 0),
                type: TIMER_SESSION_TYPE.POMODORO,
                tasks: ["Confusing people trying to read my sample data"],
                pauseTime: 0
            },
        ];
        const timerCycles = getTimerCyclesFromTimerSessions(timerSessions);
        testTimerCyclesEquality(timerCycles, correctTimerCycles);
    })
})

test("DailyLogSession should correctly display start time and total time worked for an entire cycle", () => {
    const timerSessions = timerSessionsShortTestData();
    const timerCycles = timerCyclesShortTestData();
    render(<DailyLogSession timerSessions={timerSessions} />);
    let startTimeEl = screen.getByLabelText("Session start time");
    expect(startTimeEl).toHaveTextContent(
        `${getDateHours(timerSessions[0].startTime)}:${getDateMinutes(timerSessions[0].startTime)}`);
    let sessionTimeWorkedEl = screen.getByLabelText("Session time worked");
    const timeWorked = getTotalTimeWorked(timerSessions);
    const hours = Math.floor(timeWorked / (60 * 60 * 1000));
    const minutes = Math.floor(timeWorked % (60 * 60 * 1000) / (60 * 1000));
    expect(sessionTimeWorkedEl).toHaveTextContent(`${hours} Hours, ${minutes} Minutes`);
})