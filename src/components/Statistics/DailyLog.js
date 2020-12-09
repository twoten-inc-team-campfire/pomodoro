import React from 'react';
import {TimerSession} from "../../classes/TimerSession";
import DailyLogSession from "./DailyLogSession";

/**
 * @typedef {TimerSession} DailyLog#TimerCycle
 * @desc A compressed sequence of TimerSessions of the same type; contains additional info about all the tasks
 * completed during that timer cycle and the amount of time the timer was paused.
 * @property {[string]} tasks - All tasks that were undertaken during the timer cycle
 * @property {number} pauseTime - The length of time the timer was paused during a part of the cycle in milliseconds.
 * @ignore
 */
/**
 * DailyLog
 * @desc Displays a log of the TimerSessions for a specific day, showing information about groups of consecutive
 * TimerSessions: time started, total amount of work done, tasks that were worked on, etc.
 * @param {Date} date - The date whose information is being logged.
 * @param {TimerSessions[]} timerSessions - The TimerSessions recorded on the date passed in as an argument.
 * @param {number} gap - The permitted time gap between consecutive TimerSessions before they're split into separate
 * segments.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DailyLog({date, timerSessions, gap=20}) {
    let items = []
    if (timerSessions.length > 0) {
        gap = gap * 60 * 1000;
        timerSessions = [...timerSessions];
        let currentDay = new Date(date);
        date.setHours(0, 0, 0, 0);
        if (timerSessions[0].startTime < currentDay) {
            let temp = timerSessions[0].copy();
            temp.startTime = currentDay;
            timerSessions[0] = temp;
        }
        let nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        if (timerSessions[timerSessions.length - 1].endTime > nextDay) {
            let temp = timerSessions[timerSessions.length - 1];
            temp.endTime = nextDay;
            timerSessions[timerSessions.length - 1] = temp;
        }
        let sessions = [];
        let currentSession = [timerSessions[0]];
        for (let i = 1; i < timerSessions.length; i += 1) {
            if (timerSessions[i].startTime.getTime() -
                currentSession[currentSession.length - 1].endTime.getTime() >= gap) {
                sessions.push(currentSession);
                currentSession = [timerSessions[i]];
            } else {
                currentSession.push(timerSessions[i]);
            }
        }
        sessions.push(currentSession);
        items = sessions.map((session, index) => (
            <div style={{"marginTop": "0.5em", "marginBottom": "0.5em"}}>
                <DailyLogSession key={index} timerSessions={session}/>
            </div>
        ));
    }
    return (
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "center"}}>
            {items}
        </div>
    )
}