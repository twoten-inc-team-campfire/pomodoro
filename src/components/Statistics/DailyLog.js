import React from 'react';
import {DailyLogSession} from "./DailyLogSession";

/**
 * @typedef {TimerSession} DailyLog#TimerCycle
 * @desc A compressed sequence of TimerSessions of the same type; contains additional info about all the tasks
 * completed during that timer cycle and the amount of time the timer was paused.
 * @property {[string]} tasks - All tasks that were undertaken during the timer cycle
 * @property {number} pauseTime - The length of time the timer was paused during a part of the cycle in milliseconds.
 * @ignore
 */

/**
 * breakTimerSessionsIntoSeparateBlocks
 * @desc Breaks an ordered sequence of TimerSessions into blocks of consecutive TimerSessions
 * @param {TimerSession[]} timerSessions - The TimerSessions to be split up
 * @param {number} maxGap - The maximum allowable gap in minutes between two TimerSessions before they're split into separate blocks.
 * @returns {[TimerSession[]]}
 */
export function breakTimerSessionsIntoSeparateBlocks(timerSessions, maxGap) {
    let blocks = [];
    maxGap = maxGap * 60 * 1000;
    if (timerSessions.length > 0) {
        let currentBlock = [timerSessions[0]];
        for (let i = 1; i < timerSessions.length; i += 1) {
            if (timerSessions[i].startTime.getTime() -
                currentBlock[currentBlock.length - 1].endTime.getTime() >= maxGap) {
                blocks.push(currentBlock);
                currentBlock = [timerSessions[i]];
            } else {
                currentBlock.push(timerSessions[i]);
            }
        }
        blocks.push(currentBlock);
    }
    return blocks;
}

/**
 * DailyLog
 * @desc Displays a log of the TimerSessions for a specific day, showing information about groups of consecutive
 * TimerSessions: time started, total amount of work done, tasks that were worked on, etc.
 * @param {TimerSessions[]} timerSessions - The TimerSessions recorded on the date passed in as an argument.
 * @param {number} maxGap - The permitted time gap between consecutive TimerSessions before they're split into separate
 * segments (in minutes).
 * @returns {JSX.Element}
 * @constructor
 */
export function DailyLog({timerSessions, maxGap = 20}) {
    let items = []
    if (timerSessions.length > 0) {
        timerSessions = [...timerSessions];
        let blocks = breakTimerSessionsIntoSeparateBlocks(timerSessions, maxGap);
        items = blocks.map((session, index) => (
            <div key={index} style={{"marginTop": "0.5em", "marginBottom": "0.5em"}}>
                <DailyLogSession timerSessions={session}/>
            </div>
        ));
    }
    return (
        <div
            style={{"display": "flex", "flexDirection": "column", "justifyContent": "center"}}
            aria-label={"Timer sessions log"}
        >
            {items}
        </div>
    )
}