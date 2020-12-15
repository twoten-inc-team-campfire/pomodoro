import React from "react";
import {TIMER_SESSION_TYPE} from "../../classes/TimerSession";
import {getDateMinutes, getDateHours} from "../../utils/DateUtil";

let colorPrimary = "#086788";
let colorSecondary = "#07a0c3";
let textPrimary = "#000000";
let textSecondary = "#838383";

/**
 * getFormattedPauseTime
 * @desc Returns the number of milliseconds that the timer has been paused for a clock cycle in the format
 *  "X hours, Y minutes, Z seconds", omitted the leading terms if they're 0.
 * @param {number} time - The total number of milliseconds the timer has been paused for a clock cycle.
 * @returns {string}
 * @ignore
 */
export function getFormattedPauseTime(time) {
    let hours = null;
    let minutes = null;
    let seconds = null;

    // The pause time is longer than an hour.
    if (time > (60 * 60 * 1000)) {
        hours = Math.floor(time / (60 * 60 * 1000));
        time %= (60 * 60 * 1000);
        minutes = 0;
        seconds = 0;
    }
    if (time > 60 * 1000) {
        minutes = Math.floor(time / (60 * 1000));
        time %= (60 * 1000);
        seconds = 0
    }
    if (time > 1000) {
        seconds = Math.floor(time / 1000);
    }
    if (hours) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (minutes) {
        return `${minutes} minutes, ${seconds} seconds`;
    } else if (seconds) {
        return `${seconds} seconds`;
    }
    return "";
}

/**
 * getDailyLogSessionItem
 * @desc Returns a new row to be displayed in the DailyLogSession table
 * @param {DailyLog#TimerCycle} session - The session used to create a new DailyLogSessionItem row
 * @returns {JSX.Element[]}
 */
export function getDailyLogSessionItems(session) {
    switch (session.type) {
        case TIMER_SESSION_TYPE.SHORT_REST:
            return DailyLogShortRestItems(session);
        case TIMER_SESSION_TYPE.LONG_REST:
            return DailyLogLongRestItems(session);
        default: // TIMER_SESSION_TYPE.POMODORO
            return DailyLogPomodoroItems(session);
    }
}

export const shortRestDescription = "Short rest";

/**
 * DailyLogShortRestItem
 * @desc Returns a row for the DailyLogSession table based on a short rest TimerSession
 * @param {DailyLog#TimerCycle} session
 * @returns {JSX.Element[]}
 * @constructor
 */
export function DailyLogShortRestItems(session) {
    return [
        <svg viewBox={"0 0 10 50"} style={{"gridColumn": "2", "height": "3em", "width": "auto",
            "justifySelf": "center"}}
        >
            <line x1={"5"} y1={"0"} x2={"5"} y2={"50"} stroke={colorSecondary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
        </svg>,
        <p style={{"gridColumn": "3", "overflow": "hide", "justifySelf": "start",
            "color": textSecondary}}
           aria-label={"Short rest description"}
        >
            {shortRestDescription}
        </p>
    ];
}

export const longRestDescription = "Long rest";

/**
 * DailyLogShortRestItem
 * @desc Returns a row for the DailyLogSession table based on a short rest TimerSession
 * @param {DailyLog#TimerCycle} session
 * @returns {JSX.Element[]}
 * @constructor
 */
export function DailyLogLongRestItems(session) {
    return [
        <svg viewBox={"0 0 10 100"} style={{"gridColumn": "2", "height": "6em", "width": "auto",
            "justifySelf": "center"}}
        >
            <line x1={"5"} y1={"0"} x2={"5"} y2={"100"} stroke={colorSecondary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
        </svg>,
        <p style={{"gridColumn": "3", "overflow": "hide", "justifySelf": "start",
            "color": textSecondary}}
           aria-label={"Long rest description"}
        >
            {longRestDescription}
        </p>
    ];
}

/**
 * DailyLogShortRestItem
 * @desc Returns a row for the DailyLogSession table based on a short rest TimerSession
 * @param {DailyLog#TimerCycle} session
 * @returns {JSX.Element[]}
 * @constructor
 */
export function DailyLogPomodoroItems(session) {
    return [
        <div style={{"display": "flex", "flexDirection": "column", "gridColumn": "1",
            "justifySelf": "end", "color": textSecondary}}
        >
            <p aria-label={"Pomodoro start time"} style={{"margin": "0 0 0 0"}}>
                {`${getDateHours(session.startTime)}:${getDateMinutes(session.startTime)}`}
            </p>
            <p aria-label={"Pomodoro end time"} style={{"margin": "0 0 0 0"}}>
                {`${getDateHours(session.endTime)}:${getDateMinutes(session.endTime)}`}
            </p>
        </div>,
        <svg viewBox={"0 0 10 100"} style={{"gridColumn": "2", "height": "6em", "width": "auto",
            "justifySelf": "center"}}
        >
            <line x1={"5"} y1={"0"} x2={"5"} y2={"100"} stroke={colorPrimary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
        </svg>,
        <div style={{"gridColumn": "3", "height": "inherit", "overflow": "hide", "justifySelf": "start",
            "textAlign": "start"}}
            aria-label={"Pomodoro description"}
        >
            <p style={{"color": textPrimary, "margin": "0 0 0 0"}}
               aria-label={"Pomodoro tasks"}
            >
                {`Task(s): ${session.tasks.join(", ")}`}
            </p>
            <p style={{"color": textSecondary, "margin": "0 0 0 0"}}
                aria-label={"Pomodoro pause time"}
            >
                {session.pauseTime >= 1000 ? `Time paused: ${getFormattedPauseTime(session.pauseTime)}` : ""}
            </p>
        </div>
    ];
}