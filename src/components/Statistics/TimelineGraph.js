import React from 'react';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import {TimerSession} from "../../classes/TimerSession";

let textPrimary = "#000000";
let textSecondary = "#838383";
let textTertiary = "#c4c4c4";
let colorPrimary = "#086788";

/**
 *
 * @param {Date} date - The date we want to model.
 * @param {[TimerSession]} timerSessions - The array of TimerSessions on that date. For now, we're assuming
 * the array is well-formed. In other words, the TimerSessions are ordered sequentially and at least partially take
 * place on the date in passed-in.
 * @param {number} maxGap - The permitted gap between TimerSessions before we split them into separate sections,
 * in minutes.
 * @returns {JSX.Element}
 * @constructor
 */
function TimelineGraph({date, timerSessions, maxGap = 5}) {
    maxGap = maxGap * 60 * 1000; // The amount of allowance between timerSessions. If the user takes longer than
                               // 5 minutes unmarked, we separate the timerSessions into new "blocks".
    let timeBlockSvgs = []
    if (timerSessions.length !== 0) {
        // First, shallow copy our timerSessions so we don't modify the original array.
        timerSessions = [...timerSessions];

        // Second, get the ms bounds for our day.
        let currentDay = new Date(date);
        currentDay.setHours(0, 0, 0, 0);
        const dayStartMs = currentDay.getTime();
        let nextDay = new Date(currentDay);
        nextDay.setDate(currentDay.getDate() + 1);
        const dayLengthMs = nextDay.getTime() - dayStartMs;

        // Third, edit the first and last timerSessions to make sure they completely fall within the current day.
        if (timerSessions[0].startTime < currentDay) {
            let temp = timerSessions[0].copy();
            temp.startTime = currentDay;
            timerSessions[0] = temp;
        }
        if (timerSessions[timerSessions.length - 1].endTime > nextDay) {
            let temp = timerSessions[0].copy();
            temp.endTime = nextDay;
            timerSessions[timerSessions.length - 1] = temp;
        }

        // Fourth, process the timerSessions to extract their lengths.
        let timeBlocks = [];
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

        // Finally, transform these into svg coordinates
        for (const block of timeBlocks) {
            let x = 5 + (block.startTime - dayStartMs) / dayLengthMs * 90;
            let width = (block.endTime - block.startTime) / dayLengthMs * 90;
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
        <svg viewBox={"0 0 100 16"}>
            {/* Icons are aligned along the "top row" of the svg */}
            <NightsStayOutlinedIcon style={{"color":textSecondary}}
                                    width={iconWidth} height={iconHeight} x={"13.75"} y={iconY}/>
            <WbSunnyOutlinedIcon style={{"color":textSecondary}}
                                 width={iconWidth} height={iconHeight} x={"47.5"} y={iconY}/>
            <NightsStayOutlinedIcon style={{"color":textSecondary}}
                                    width={iconWidth} height={iconHeight} x={"81.25"} y={iconY}/>
            {/* This rectangle defines the "line" of the line graph */}
            <rect fill={textTertiary} width={"90"} height={"5"} x={"5"} y={"9"} rx={"2.5"}/>
            {/* These lines mark the delineation between night and day */}
            <rect fill={textTertiary} width={"0.5"} height={"9"} x={"27.25"} y={"7"} ry={"0.25"}/>
            <rect fill={textTertiary} width={"0.5"} height={"9"} x={"72.25"} y={"7"} ry={"0.25"}/>
            {/* Finally, the rectangles for the timer sessions*/}
            { timeBlockSvgs }
        </svg>
    )
}

export default TimelineGraph