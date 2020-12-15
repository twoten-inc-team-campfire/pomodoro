import {TIMER_SESSION_TYPE} from "../../classes/TimerSession";
import {getDailyLogSessionItems} from "./DailyLogSessionItems";
import React from "react";
import {getDateHours, getDateMinutes} from "../../utils/DateUtil";

let colorPrimary = "#086788";
// let colorSecondary = "#07a0c3";
let textPrimary = "#000000";
// let textSecondary = "#838383";

/**
 * compressTimerSessions
 * @desc Compresses a sequence of TimerSessions into a sequence of TimerCycles that only contain information about
 *  a particular cycle of the timer (for example, all TimerSessions for a consecutive work session are compressed
 *  down to one TimerCycle).
 * @param {TimerSession[]} timerSessions - The timer sessions to be compressed
 * @returns {DailyLog#TimerCycle[]}
 * @ignore
 */
export function getTimerCyclesFromTimerSessions(timerSessions) {
    let timerCycles = [];
    if (timerSessions.length > 0) {
        let currentSession = timerSessions[0].copy();
        currentSession.pauseTime = 0;
        currentSession.tasks = currentSession.task ? [currentSession.task] : [];
        for (const session of timerSessions) {
            if (session.type !== currentSession.type) {
                timerCycles.push(currentSession);
                currentSession = session.copy();
                currentSession.pauseTime = 0;
                currentSession.tasks = session.task ? [currentSession.task] : [];
            } else {
                if (session.startTime > currentSession.endTime)
                    currentSession.pauseTime += session.startTime.getTime() - currentSession.endTime.getTime();
                currentSession.endTime = session.endTime;
                if (session.task && !currentSession.tasks.includes(session.task))
                    currentSession.tasks.push(session.task);
            }
        }
        timerCycles.push(currentSession);
    }
    return timerCycles;
}

/**
 * getTotalTimeWorked
 * @desc Calculates the total amount of time the user worked (the sum of all TIMER_SESSION_TYPE.POMODORO lengths).
 * @param {TimerSession[]} timerSessions
 * @return {number} - The length of time worked in milliseconds.
 * @ignore
 */
export function getTotalTimeWorked(timerSessions) {
    let timeWorked = 0;
    for (const session of timerSessions) {
        if (session.type === TIMER_SESSION_TYPE.POMODORO)
            timeWorked += session.getDuration();
    }
    return timeWorked
}

/**
 * DailyLogSession
 * @desc Returns information about a group of sequential TimerSessions in a specific day.
 * @param {TimerSession[]} timerSessions - A group of sequential TimerSessions that were all recorded in one day.
 * @returns {JSX.Element}
 * @constructor
 */
export function DailyLogSession({timerSessions}) {
    let timeWorked = getTotalTimeWorked(timerSessions);
    let timerCycles = getTimerCyclesFromTimerSessions(timerSessions);
    let dailyLogItems = [];
    for (const cycle of timerCycles) {
        dailyLogItems.push(...getDailyLogSessionItems(cycle))
    }
    let hoursWorked = Math.floor(timeWorked / (60 * 60 * 1000));
    let minutesWorked = Math.floor( timeWorked % (60 * 60 * 1000) / (60 * 1000));
    return (
        <div style={{
            "display": "grid",
            "gridTemplateColumns": "20fr 5em 100fr",
            "alignItems": "center",
            "gap": "0em 1em",
        }}>
            <p style={{"justifySelf": "center", "color": textPrimary}}
                aria-label={"Session start time"}
            >
                {`${getDateHours(timerSessions[0].startTime)}:${getDateMinutes(timerSessions[0].startTime)}`}
            </p>
            <svg style={{"width": "3em", "height": "auto",
                "justifySelf": "center", "alignSelf": "center"}} viewBox={"0, 0, 2, 2"}>
                <circle cx={"1"} cy={"1"} r={"1"} fill={colorPrimary}/>
            </svg>
            <p style={{"justifySelf": "center", "color": textPrimary}}
                aria-label={"Session time worked"}
            >
                {`Time Worked: ${hoursWorked} Hours, ${minutesWorked} Minutes`}
            </p>
            {dailyLogItems}
        </div>
    )
}