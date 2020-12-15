import React from 'react';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import {fitTimerSessionsIntoRange} from "../../utils/StatisticsPageUtil";

// let textPrimary = "#000000";
let textSecondary = "#838383";
let textTertiary = "#c4c4c4";
let colorPrimary = "#086788";

/**
 * @typedef TimelineGraph#TimeBlock
 * @desc A compressed sequence of consecutive TimerSessions; specifies when the run of timer sessions started and ended.
 * @property {number} startTime - The time that the time block started in ms
 * @property {number} endTime - The time that the time block ended in ms
 * @ignore
 */
/**
 * getTimeSessionsContinuousTimeBlocks
 * @desc Returns time blocks corresponding to the time the user was active (had TimerSessions running)
 * @param {TimerSession[]} timerSessions - The timer sessions to be condensed into time blocks
 * @param {number} maxGap - The maximum allowed time between TimerSessions before they're split into separate blocks.
 * @returns {TimeBlock[]}
 * @ignore
 */
export function getTimerSessionsTimeBlocks(timerSessions, maxGap) {
    maxGap = maxGap * 60 * 1000; // The amount of allowance between timerSessions. If the user takes longer than
                                 // 5 minutes unmarked, we separate the timerSessions into new "blocks".
    let timeBlocks = [];
    if (timerSessions.length > 0) {
        let currentBlock = {
            startTime: timerSessions[0].startTime.getTime(),
            endTime: timerSessions[0].endTime.getTime()
        };
        for (let i = 1; i < timerSessions.length; i += 1) {
            let startMs = timerSessions[i].startTime.getTime();
            let endMs = timerSessions[i].endTime.getTime();
            if (startMs > currentBlock.endTime + maxGap) {
                timeBlocks.push(currentBlock);
                currentBlock = {
                    startTime: startMs,
                    endTime: endMs
                };
            } else {
                currentBlock.endTime = endMs;
            }
        }
        timeBlocks.push(currentBlock);
    }
    return timeBlocks;
}

/**
 * @typedef TimelineGraph#TimeBlockInRange
 * @desc A compressed sequence of consecutive TimerSessions, stating when the block started and ended within the range.
 * @property {number} startTime - The percentage into the range that the TimeBlock started
 * @property {number} endTime - The percentage into the range that the TimeBlock ended
 * @ignore
 */
/**
 *
 * @param {TimelineGraph#TimeBlock} timeBlocks - We need to find the percentage that these TimeBlocks are into the range
 * @param {Date} startTime - When the range starts
 * @param {Date} endTime - When the range ends
 * @returns {TimelineGraph#TimeBlockInRange[]}
 */
export function getPercentIntoRange(timeBlocks, startTime, endTime) {
    let rangeOffset = startTime.getTime();
    let rangeLength = endTime.getTime() - rangeOffset;
    let timeBlocksInRange = [];
    for (const timeBlock of timeBlocks) {
        timeBlocksInRange.push({
            startTime: (timeBlock.startTime - rangeOffset) / rangeLength,
            endTime: (timeBlock.endTime - rangeOffset) / rangeLength
        });
    }
    return timeBlocksInRange;
}

/**
 * TimelineGraph
 * @desc Displays a visual summary of a day's TimerSessions in the form of a marked timeline.
 * @param {Date} date - The date we want to model.
 * @param {TimerSession[]} timerSessions - The array of TimerSessions on that date. For now, we're assuming
 * the array is well-formed. In other words, the TimerSessions are ordered sequentially and at least partially take
 * place on the date in passed-in.
 * @param {number} maxGap - The permitted gap between TimerSessions before we split them into separate sections,
 * in minutes.
 * @returns {JSX.Element}
 * @constructor
 */
export function TimelineGraph({date, timerSessions, maxGap = 10}) {
    let timeBlockSvgs = [];
    const timelineX = 5;
    const timelineWidth = 90;

    if (timerSessions.length !== 0) {
        // First, shallow copy our timerSessions so we don't modify the original array.
        timerSessions = [...timerSessions];

        // Second, get the ms bounds for our day.
        let currentDay = new Date(date);
        currentDay.setHours(0, 0, 0, 0);
        const dayStartMs = currentDay.getTime();
        let nextDay = new Date(currentDay);
        nextDay.setDate(currentDay.getDate() + 1);

        // Third, edit the first and last timerSessions to make sure they completely fall within the current day.
        timerSessions = fitTimerSessionsIntoRange(timerSessions, currentDay, nextDay);

        // Fourth, process the timerSessions to extract their lengths.
        let timeBlocks = getTimerSessionsTimeBlocks(timerSessions, maxGap);

        // Fifth, find what percentage of the range each timeBlock spans
        let timeBlocksInRange = getPercentIntoRange(timeBlocks, currentDay, nextDay);

        // Finally, transform these into svg coordinates
        for (const block of timeBlocksInRange) {
            let x = timelineX + block.startTime * timelineWidth;
            let width = (block.endTime - block.startTime) * timelineWidth;
            timeBlockSvgs.push(<rect
                width={width}
                height={"7"}
                x={x}
                y={"8"}
                fill={colorPrimary}
            />);
        }
    }

    const iconHeight = "5";  // Or 5 units relative to the viewbox
    const iconWidth = "5";    // Also 5 units relative to the viewbox
    const iconY = "0";        // Place icons along the "top row", 5 units above the line


    return (
        <svg viewBox={"0 0 100 16"}
            aria-label={"Timeline graph"}
        >
            {/* Icons are aligned along the "top row" of the svg */}
            <NightsStayOutlinedIcon style={{"color":textSecondary}}
                                    width={iconWidth} height={iconHeight} x={"13.75"} y={iconY}/>
            <WbSunnyOutlinedIcon style={{"color":textSecondary}}
                                 width={iconWidth} height={iconHeight} x={"47.5"} y={iconY}/>
            <NightsStayOutlinedIcon style={{"color":textSecondary}}
                                    width={iconWidth} height={iconHeight} x={"81.25"} y={iconY}/>
            {/* This rectangle defines the "line" of the line graph */}
            <rect fill={textTertiary} width={timelineWidth} height={"5"} x={timelineX} y={"9"} rx={"2.5"}/>
            {/* These lines mark the delineation between night and day */}
            <rect fill={textTertiary} width={"0.5"} height={"9"} x={"27.25"} y={"7"} ry={"0.25"}/>
            <rect fill={textTertiary} width={"0.5"} height={"9"} x={"72.25"} y={"7"} ry={"0.25"}/>
            {/* This line makes the day's midpoint */}
            <rect fill={textTertiary} width={"0.5"} height={"9"} x={"49.75"} y={"7"} ry={"0.25"}/>
            {/* Finally, the rectangles for the timer sessions*/}
            { timeBlockSvgs }
        </svg>
    )
}