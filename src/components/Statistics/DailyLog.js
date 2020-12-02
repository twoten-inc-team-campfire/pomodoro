import React from 'react';
import {TimerSession} from "../../classes/TimerSession";
import DailyLogItem from "./DailyLogItem";

/**
 *
 * @param {Date} date
 * @param {[TimerSessions]} timerSessions
 * @param {number} gap
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
                <DailyLogItem key={index} timerSessions={session}/>
            </div>
        ));
    }
    return (
        <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "center"}}>
            {items}
        </div>
    )
}