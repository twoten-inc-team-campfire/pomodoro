import React from 'react';
import { render, screen } from '@testing-library/react';
import {TIMER_SESSION_TYPE, TimerSession} from "../../classes/TimerSession";
import {breakTimerSessionsIntoSeparateBlocks, DailyLog} from "./DailyLog";

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
            new Date(2020, 10, 11, 15, 30, 0, 1),
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

// Specifically, 15 minute blocks
function timerSessionTestDataBlocks() {
    return [
        [
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
            )
        ],
        [
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
            )
        ],
        [
            new TimerSession (
                new Date(2020, 10, 11, 15, 30, 0, 1),
                new Date(2020, 10, 11, 15, 55, 0, 0),
                TIMER_SESSION_TYPE.POMODORO,
                "Confusing people trying to read my sample data"
            )
        ],
        [
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
        ]
    ];
}

describe("breakTimerSessionsIntoSeparateBlocks should successfully break an array of TimerSessions \
    into blocks", () => {
    test("The function should return nothing for an empty input", () => {
        const timerSessions = [];
        const timerSessionBlocks = [];
        const res = breakTimerSessionsIntoSeparateBlocks(timerSessions, 15);
        expect(res).toEqual(timerSessionBlocks);
    })
    test("The function should return a single block if all the gaps between TimerSessions are within maxGap", () => {
        const timerSessions = timerSessionsTestData();
        const timerSessionBlocks = [timerSessionsTestData()];
        // 15 hours. Quite a long gap!
        const res = breakTimerSessionsIntoSeparateBlocks(timerSessions, 15 * 60);
        expect(res).toEqual(timerSessionBlocks);
    })
    test("The function should return multiple blocks if some gaps between TImerSessions are longer \
    than the maxGap", () => {
        const timerSessions = timerSessionsTestData();
        const timerSessionBlocks = timerSessionTestDataBlocks();
        // 15 minutes. A bit more reasonable!
        const res = breakTimerSessionsIntoSeparateBlocks(timerSessions, 15);
        expect(res).toEqual(timerSessionBlocks);
    })
})

describe("DailyLog should correctly display a sequence of DailyLogSessions based on the input TimerSessions \
    and gap", () => {
    test("The component should not display anything if the timerSession input is empty", () => {
        const timerSessions = [];
        render(<DailyLog timerSessions={timerSessions} gap={20}/>);
        let containerDiv = screen.getByLabelText("Timer sessions log");
        expect(containerDiv).toBeEmptyDOMElement();
    })
    test("The component should only display a single DailyLogSession if all TimerSessions go in a single block", () => {
        const timerSessions = timerSessionsTestData();
        render(<DailyLog timerSessions={timerSessions} gap={24 * 60}/>);
        let containerDiv = screen.getByLabelText("Timer sessions log");
        expect(containerDiv).not.toBeEmptyDOMElement();
        expect(containerDiv.childElementCount).toEqual(1);
    })
    test("The component should display multiple DailyLogSessions if the TimerSessions don't fit in a single \
    block", () => {
        const timerSessions = timerSessionsTestData();
        const timerSessionBlocks = timerSessionTestDataBlocks();
        render(<DailyLog timerSessions={timerSessions} gap={15}/>);
        let containerDiv = screen.getByLabelText("Timer sessions log");
        expect(containerDiv).not.toBeEmptyDOMElement();
        expect(containerDiv.childElementCount).toEqual(timerSessionBlocks.length);
    })
})