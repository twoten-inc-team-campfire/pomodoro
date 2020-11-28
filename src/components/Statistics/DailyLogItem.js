import React from "react";
import {TimerSession, TIMER_SESSION_TYPE} from "../../classes/TimerSession";

let colorPrimary = "#086788";
let colorSecondary = "#07a0c3";
let textPrimary = "#000000";
let textSecondary = "#838383";

/**
 * getDateHour
 * @desc Returns the formatted hour (hh) for a given date.
 * @param {Date} date - Returns the formatted hour from this date.
 * @example
 * // returns 03
 * date.setHours(3, 6, 5, 0)
 * getDateHour(date);
 * @returns {string}
 * @ignore
 */
function getDateHours(date) {
    let hour = date.getHours().toString();
    if (hour.length < 2)
        hour = "0" + hour;
    return hour;
}

/**
 * getDateMinutes
 * @desc Returns the formatted minute (mm) for a given date.
 * @param {Date} date - Returns the formatted minute from this date.
 * @example
 * // returns 06
 * date.setHours(3, 6, 5, 0)
 * getDateHour(date);
 * @returns {string}
 * @ignore
 */
function getDateMinutes(date) {
    let minute = date.getMinutes().toString();
    if (minute.length < 2)
        minute = "0" + minute;
    return minute;
}

/**
 * getFormattedPauseTime
 * @desc Returns the number of milliseconds that the timer has been paused for a clock cycle in the format
 * "X hours, Y minutes, Z seconds", omitted the leading terms if they're 0.
 * @param {number} time - The total number of milliseconds the timer has been paused for a clock cycle.
 * @returns {string}
 * @ignore
 */
function getFormattedPauseTime(time) {
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
 * getTasksString
 * @desc Takes an array of tasks and reduces them into a single string that describes the tasks completed.
 * @param {[string]} tasks - The array of tasks to be reduced into a string.
 * @returns {string}
 * @ignore
 */
function getTasksString(tasks) {
    if (tasks.length > 0) {
        let str = "";
        for (let i = 0; i < tasks.length - 1; i += 1) {
            str += tasks[i] + ", "
        }
        str += tasks[tasks.length - 1];
        return str;
    }
    return "";
}

/**
 * @typedef {TimerSession} SessionInfo
 * @desc A TimerSession, but with additional info about all the tasks completed during that timer cycle and the
 * amount of time the timer was paused.
 * @property {[string]} tasks - All tasks that were undertaken during the timer cycle
 * @property {number} pauseTime - The length of time the timer was paused during a part of the cycle in milliseconds.
 * @ignore
 */

/**
 * getSessionRow
 * @param {SessionInfo} session
 * @returns {JSX.Element[]}
 */
function getSessionRow(session) {
    switch (session.type) {
        case TIMER_SESSION_TYPE.SHORT_REST:
            return [
                <svg viewBox={"0 0 10 50"} style={{"gridColumn": "2", "height": "3em", "width": "auto",
                    "justifySelf": "center"}}
                >
                    <line x1={"5"} y1={"0"} x2={"5"} y2={"50"} stroke={colorSecondary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
                </svg>,
                <p style={{"gridColumn": "3", "overflow": "hide", "justifySelf": "start",
                    "color": textSecondary}}
                >
                    {"Short rest"}
                </p>
            ];
        case TIMER_SESSION_TYPE.LONG_REST:
            return [
                <svg viewBox={"0 0 10 100"} style={{"gridColumn": "2", "height": "6em", "width": "auto",
                    "justifySelf": "center"}}
                >
                    <line x1={"5"} y1={"0"} x2={"5"} y2={"100"} stroke={colorSecondary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
                </svg>,
                <p style={{"gridColumn": "3", "overflow": "hide", "justifySelf": "start",
                    "color": textSecondary}}
                >
                    {"Long rest"}
                </p>
            ];
        default: // TIMER_SESSION_TYPE.POMODORO
            return [
                <div style={{"display": "flex", "flexDirection": "column", "gridColumn": "1",
                    "justifySelf": "end", "color": textSecondary}}
                >
                    <p style={{"margin": "0 0 0 0"}}>
                        {`${getDateHours(session.startTime)}:${getDateMinutes(session.startTime)}`}
                    </p>
                    <p>
                        {`${getDateHours(session.endTime)}:${getDateMinutes(session.endTime)}`}
                    </p>
                </div>,
                <svg viewBox={"0 0 10 100"} style={{"gridColumn": "2", "height": "6em", "width": "auto",
                    "justifySelf": "center"}}
                >
                    <line x1={"5"} y1={"0"} x2={"5"} y2={"100"} stroke={colorPrimary} strokeWidth={"2"} strokeDasharray={"8 2"}/>
                </svg>,
                <div style={{"gridColumn": "3", "height": "inherit", "overflow": "hide", "justifySelf": "start",
                    "textAlign": "start"}}>
                    <p style={{"color": textPrimary}}
                    >
                        {`Task(s): ${getTasksString(session.tasks)}`}
                    </p>
                    <p style={{"color": textSecondary}}>
                        {session.pauseTime >= 1000 ? `Time paused: ${getFormattedPauseTime(session.pauseTime)}` : ""}
                    </p>
                </div>
            ];
    }
}

/**
 * DailyLogItem
 * @desc Returns information about a group of sequential TimerSessions in a specific day.
 * @param {[TimerSession]} timerSessions - A group of sequential TimerSessions that were all recorded in one day.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DailyLogItem({timerSessions}) {
    let timeWorked = 0
    let currentSession = timerSessions[0].copy();
    currentSession.pauseTime = 0;
    currentSession.tasks = [currentSession.task];
    let dailyLogItems = []
    for (const session of timerSessions) {
        if (session.type === TIMER_SESSION_TYPE.POMODORO)
            timeWorked += session.getDuration();
        if (session.type !== currentSession.type) {
            dailyLogItems.push(...getSessionRow(currentSession))
            currentSession = session.copy();
            currentSession.pauseTime = 0;
            currentSession.tasks = [currentSession.task];
        } else {
            if (session.startTime > currentSession.endTime)
                currentSession.pauseTime += session.startTime.getTime() - currentSession.endTime.getTime();
            currentSession.endTime = session.endTime;
            if (!currentSession.tasks.includes(session.task))
                currentSession.tasks.push(session.task);
        }
    }
    dailyLogItems.push(...getSessionRow(currentSession));
    let hoursWorked = Math.floor(timeWorked % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
    let minutesWorked = Math.floor( timeWorked % (60 * 60 * 1000) / (60 * 1000));
    return (
        <div style={{
            "display": "grid",
            "gridTemplateColumns": "20fr 5em 100fr",
            "alignItems": "center",
            "gap": "0em 1em",
        }}>
            <p style={{"justifySelf": "center", "color": textPrimary}}>
                {`${getDateHours(timerSessions[0].startTime)}:${getDateMinutes(timerSessions[0].startTime)}`}
            </p>
            <svg style={{"width": "3.5em", "height": "auto",
                "justifySelf": "center", "alignSelf": "center"}} viewBox={"0, 0, 4, 4"}>
                <circle cx={"2"} cy={"2"} r={"2"} fill={colorPrimary}/>
            </svg>
            <p style={{"justifySelf": "center", "color": textPrimary}}>
                {`Time Worked: ${hoursWorked} Hours, ${minutesWorked} Minutes`}
            </p>
            {dailyLogItems}
        </div>
    )
}