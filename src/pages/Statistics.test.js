import React from 'react';
import { render, screen } from '@testing-library/react';
import {TIMER_SESSION_TYPE, TimerSession} from "../classes/TimerSession";
import {loadTimerSessionListByDate} from "../services/DefaultDataService";
import {Statistics, statisticsLogMaxGap} from "./Statistics";
import userEvent from "@testing-library/user-event";
import {dateToHtmlDateString, getDateHours, getDateMinutes} from "../utils/DateUtil";
import {breakTimerSessionsIntoSeparateBlocks} from "../components/Statistics/DailyLog";

function timerSessionsTestToday() {
    return [
        new TimerSession (
            new Date((new Date()).setHours(-1, 55, 0, 0)),
            new Date((new Date()).setHours(0, 20, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date((new Date()).setHours(0, 20, 0, 0)),
            new Date((new Date()).setHours(0, 25, 0, 0)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Whew, base cases are hard work!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(13, 35, 0, 0)),
            new Date((new Date()).setHours(14, 0,0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Making sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(14, 0, 0, 0)),
            new Date((new Date()).setHours(14, 5, 0, 0)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Making sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(14, 7, 0, 0)),
            new Date((new Date()).setHours(14, 17, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Making samples of sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(14, 20, 30, 0)),
            new Date((new Date()).setHours(14, 29, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Making samples of sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(14, 30, 0, 0)),
            new Date((new Date()).setHours(14, 35, 0, 0)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Sampling the samples of sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(14, 35, 0, 0)),
            new Date((new Date()).setHours(15, 0, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Sampling sample dates for samples of sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(15, 0, 0, 0)),
            new Date((new Date()).setHours(15, 15, 0, 0)),
            TIMER_SESSION_TYPE.LONG_REST,
            "Whew, sampling sample sample data wears me out"
        ),
        new TimerSession (
            new Date((new Date()).setHours(15, 30, 0, 0)),
            new Date((new Date()).setHours(15, 55, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Confusing people trying to read my sample data"
        ),
        new TimerSession (
            new Date((new Date()).setHours(22, 57, 45, 0)),
            new Date((new Date()).setHours(23, 22, 15, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date((new Date()).setHours(23, 30, 0, 0)),
            new Date((new Date()).setHours(23, 35, 0, 0)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Testing component's ability to handle samples that straddle two dates"
        ),
        new TimerSession (
            new Date((new Date()).setHours(23, 40, 0, 0)),
            new Date((new Date()).setHours(24, 5, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        ),
    ];
}

function timerSessionsTestYesterday() {
    return [
        new TimerSession(
            new Date((new Date()).setHours(-14, 24, 0, 0)),
            new Date((new Date()).setHours(-14, 32, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing page's ability to switch between days"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-14, 36, 36, 4)),
            new Date((new Date()).setHours(-14, 53, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "Page, you are the chosen one to switch between days!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-14, 58, 30, 164)),
            new Date((new Date()).setHours(-13, 3, 30, 934)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "Pfft, the log doesn't show tasks during breaks"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-13, 5, 36, 4)),
            new Date((new Date()).setHours(-13, 24, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "Lololol, duplicate tasks!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-13, 32, 36, 4)),
            new Date((new Date()).setHours(-13, 38, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "Lololol, duplicate tasks!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-12, 10, 36, 4)),
            new Date((new Date()).setHours(-12, 25, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "I'm all alone in el mundo!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-1, 14, 36, 4)),
            new Date((new Date()).setHours(-1, 34, 14, 463)),
            TIMER_SESSION_TYPE.POMODORO,
            "Ha, you'll see me but not the task below me!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-1, 42, 8, 901)),
            new Date((new Date()).setHours(-1, 47, 36, 4)),
            TIMER_SESSION_TYPE.POMODORO,
            "Well, okay, maybe you'll see me too, but definitely not the next one!"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-1, 48, 30, 164)),
            new Date((new Date()).setHours(-1, 53, 30, 934)),
            TIMER_SESSION_TYPE.SHORT_REST,
            "The invisible task, stealthy and sleek"
        ),
        new TimerSession(
            new Date((new Date()).setHours(-1, 55, 0, 0)),
            new Date((new Date()).setHours(0, 20, 0, 0)),
            TIMER_SESSION_TYPE.POMODORO,
            "Testing component's ability to handle samples that straddle two dates"
        )
    ];
}

jest.mock("../services/DefaultDataService");
jest.mock('idb-keyval');

describe("The statistics page should correctly display information about the user's TimerSessions", () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    prevDate.setHours(0, 0, 0, 0);
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);

    async function testStatsPageDisplaysTimerSessionsCorrectly(timerSessions) {
        let dateNavigatorEl = screen.getByLabelText("Date selector");
        // Since we already found the element, will this ever be false?
        expect(dateNavigatorEl).toBeInTheDocument();
        let timelineGraphEl = screen.getByLabelText("Timeline graph");
        expect(timelineGraphEl).toBeInTheDocument();
        let dailyLogEl = screen.getByLabelText("Timer sessions log");
        expect(dailyLogEl).toBeInTheDocument();
        // The date navigator should display the correct date.
        let dateInput = screen.getByLabelText("Date input");
        expect(dateInput).toHaveValue(dateToHtmlDateString(date));
        // The log should display the correct information for the TimerSessions.
        let blocks = breakTimerSessionsIntoSeparateBlocks(timerSessions, statisticsLogMaxGap);
        let startTimeEls = await screen.findAllByLabelText("Session start time");
        expect(startTimeEls.length).toEqual(blocks.length);
        let correctStartTimes = blocks.map(block =>
            `${getDateHours(block[0].startTime)}:${getDateMinutes(block[0].startTime)}`);
        for (let i = 0; i < correctStartTimes.length; i += 1)
            expect(startTimeEls[i]).toHaveTextContent(correctStartTimes[i]);
    }

    test("It should correctly display its constituent components", async () => {
        loadTimerSessionListByDate.mockResolvedValueOnce(timerSessionsTestToday());
        // Each top level container for the components has an aria label. To ensure the components exist, we check
        // that these aria labels exist in the document.
        await render(<Statistics date={date} maxDate={date}/>);

        // We only expect the page to query the db once for the initial load.
        expect(loadTimerSessionListByDate).toBeCalledTimes(1);
        expect(loadTimerSessionListByDate).toHaveBeenCalledWith(date, nextDate);

        let timerSessions = timerSessionsTestToday();
        await testStatsPageDisplaysTimerSessionsCorrectly(timerSessions);
    })
    test("It should update its components upon date change", async () => {
        loadTimerSessionListByDate.mockResolvedValueOnce(timerSessionsTestToday())
            .mockResolvedValueOnce(timerSessionsTestYesterday());
        render(<Statistics date={date} maxDate={date} />);
        expect(loadTimerSessionListByDate).toHaveBeenCalledTimes(1);

        // The rightArrow should begin disabled since the user cannot navigate past the max date.
        // Therefore, this should not trigger a request to change the date.
        let rightArrow = screen.getByRole("button", {name: "Increase date"});
        userEvent.click(rightArrow);
        expect(loadTimerSessionListByDate).toHaveBeenCalledTimes(1);

        // However, clicking the leftArrow should change the date.
        let leftArrow = screen.getByRole("button", {name: "Decrease date"});
        userEvent.click(leftArrow);
        expect(loadTimerSessionListByDate).toHaveBeenCalledTimes(2);
        expect(loadTimerSessionListByDate).toHaveBeenCalledWith(prevDate, date);

        // Finally, check whether the page updated with the new timer sessions.
        let timerSessions = timerSessionsTestYesterday();
        await testStatsPageDisplaysTimerSessionsCorrectly(timerSessions);
    })
})