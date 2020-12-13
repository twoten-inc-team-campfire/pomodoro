import React from 'react';
import { render, screen } from '@testing-library/react';
import {getFormattedPauseTime, getDailyLogSessionItems, DailyLogShortRestItems, DailyLogLongRestItems,
    DailyLogPomodoroItems, shortRestDescription, longRestDescription} from "./DailyLogSessionItems";
import {TIMER_SESSION_TYPE, TimerSession} from "../../classes/TimerSession";
import {getDateHours, getDateMinutes} from "../../utils/DateUtil";

function dailyLogTestDatum() {
    let startTime = new Date(2121, 1, 2, 1, 2, 1);
    let endTime = new Date(2121, 1, 2, 1, 8, 43);
    let timerCycle = new TimerSession(startTime, endTime);
    timerCycle.tasks = ["Bark like a cat", "Meow like a dog", "Learn proper animal sounds"];
    timerCycle.pauseTime = 1 * 60 * 1000 + 42 * 1000;
    return timerCycle;
}

describe("getFormattedPauseTime should correctly return a formatted string describing " +
    "how long the timer was paused", () => {
    test("If the paused time was at least an hour, the function should return the paused hours, minutes, \
        and seconds", () => {
        // 4 hours, 53 minutes, 11 seconds, 593 ms
        let pauseTime = 4 * 60 * 60 * 1000 + 53 * 60 * 1000 + 11 * 1000 + 593;
        let pauseTimeStr = "4 hours, 53 minutes, 11 seconds";
        let str = getFormattedPauseTime(pauseTime);
        expect(str).toEqual(pauseTimeStr);

        // 4 hours
        pauseTime = 4 * 60 * 60 * 1000;
        pauseTimeStr = "4 hours, 0 minutes, 0 seconds";
        str = getFormattedPauseTime(pauseTime);
        expect(str).toEqual(pauseTimeStr);
    })
    test("If the paused time was at least a minute but less than an hour, the function should return the \
        paused minutes and seconds", () => {
        // 37 minutes, 12 seconds, 310 ms
        let pauseTime = 37 * 60 * 1000 + 12 * 1000 + 310;
        let pauseTimeStr = "37 minutes, 12 seconds";
        let str = getFormattedPauseTime(pauseTime);
        expect(str).toEqual(pauseTimeStr);

        // 37 minutes
        pauseTime = 37 * 60 * 1000;
        pauseTimeStr = "37 minutes, 0 seconds";
        str = getFormattedPauseTime(pauseTime);
        expect(str).toEqual(pauseTimeStr);
    })
    test("If the paused time was at least a second but less than a minute, the function should just return \
        the number of paused seconds", () => {
        // 59 seconds, 999 ms
        let pauseTime = 59 * 1000 + 999;
        let pauseTimeStr = "59 seconds";
        let str = getFormattedPauseTime(pauseTime);
        expect(str).toEqual(pauseTimeStr);
    })
})

describe("getDailyLogSessionItems should return the correct items based on the TimerSession type", () => {
    test("If the TimerSession is a short rest, the function should return the short rest items", () => {
        let timerCycle = dailyLogTestDatum();
        timerCycle.type = TIMER_SESSION_TYPE.SHORT_REST;
        render(<div>{getDailyLogSessionItems(timerCycle)}</div>);
        expect(screen.queryByLabelText("Short rest description")).toBeInTheDocument();
        expect(screen.queryByLabelText("Long rest description")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Pomodoro description")).not.toBeInTheDocument();
    })
    test ("If the TimerSession is a long rest, the function should return the long rest items", () => {
        let timerCycle = dailyLogTestDatum();
        timerCycle.type = TIMER_SESSION_TYPE.LONG_REST;
        render(<div>{getDailyLogSessionItems(timerCycle)}</div>);
        expect(screen.queryByLabelText("Short rest description")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Long rest description")).toBeInTheDocument();
        expect(screen.queryByLabelText("Pomodoro description")).not.toBeInTheDocument();
    })
    test("If the TimerSession is a pomodoro, the function should return the pomodoro items", () => {
        let timerCycle = dailyLogTestDatum();
        timerCycle.type = TIMER_SESSION_TYPE.POMODORO;
        render(<div>{getDailyLogSessionItems(timerCycle)}</div>);
        expect(screen.queryByLabelText("Short rest description")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Long rest description")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Pomodoro description")).toBeInTheDocument();
    })
})

test("DailyLogShortRestItems should contain a description of the short rest", () => {
    let timerCycle = dailyLogTestDatum();
    timerCycle.type = TIMER_SESSION_TYPE.SHORT_REST;
    render(<div aria-label={"Short rest items"}>{DailyLogShortRestItems(timerCycle)}</div>);
    let shortRestDescriptionElement = screen.getByLabelText("Short rest description");
    expect(shortRestDescriptionElement).toHaveTextContent(shortRestDescription);
})

test("DailyLogLongRestItems should contain a description of the long rest", () => {
    let timerCycle = dailyLogTestDatum();
    timerCycle.type = TIMER_SESSION_TYPE.LONG_REST;
    render(<div aria-label={"Long rest items"}>{DailyLogLongRestItems(timerCycle)}</div>);
    let longRestDescriptionElement = screen.getByLabelText("Long rest description");
    expect(longRestDescriptionElement).toHaveTextContent(longRestDescription);
})

test("DailyLogPomodoroItems should contain all the requisite information about the work session", () => {
    let timerCycle = dailyLogTestDatum();
    timerCycle.type = TIMER_SESSION_TYPE.POMODORO;
    render(<div aria-label={"Pomodoro items"}>{DailyLogPomodoroItems(timerCycle)}</div>);
    let pomodoroStartTimeElement = screen.getByLabelText("Pomodoro start time");
    expect(pomodoroStartTimeElement).toHaveTextContent(`${getDateHours(timerCycle.startTime)}:${getDateMinutes(timerCycle.startTime)}`);
    let pomodoroEndTimeElement = screen.getByLabelText("Pomodoro end time");
    expect(pomodoroEndTimeElement).toHaveTextContent(`${getDateHours(timerCycle.endTime)}:${getDateMinutes(timerCycle.endTime)}`);
    expect(pomodoroStartTimeElement.nextElementSibling).toBe(pomodoroEndTimeElement)
    let pomodoroTasksElement = screen.getByLabelText("Pomodoro tasks");
    expect(pomodoroTasksElement).toHaveTextContent(timerCycle.tasks.join(", "));
    let pomodoroPauseTimeElement = screen.getByLabelText("Pomodoro pause time");
    expect(pomodoroPauseTimeElement).toHaveTextContent(getFormattedPauseTime(timerCycle.pauseTime));
    expect(pomodoroTasksElement.nextElementSibling).toBe(pomodoroPauseTimeElement);
})