import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import {dateToHtmlDateString, htmlDateStringToDate, shiftDate} from "../../utils/DateUtil";


/**
 * Callback to pass the newly selected date to the parent.
 * @callback onDateChange
 * @param {Date} oldDate - The old date being overwritten
 * @param {Date} newDate - The new date that was just selected
 * @memberOf DateNavigator
 */
/**
 * DateNavigator
 * @desc Allows the user to select the date for which they want to view stats.
 * @param {Date} date - The current date being displayed
 * @param {onDateChange} onDateChange - The
 */
function DateNavigator({date, onDateChange}) {
    return (
        <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center"}}>
            <IconButton
                onClick={() => onDateChange(date, shiftDate(date,-1))}
            >
                <ArrowLeftIcon/>
            </IconButton>
            <input type="date"
                   value={dateToHtmlDateString(date)}
                   style={{border: "none"}}
                   onInput={(ev) => onDateChange(date, htmlDateStringToDate(ev.target.value))}
                   max={dateToHtmlDateString(new Date())}
            />
            <IconButton
                onClick={() => onDateChange(date, shiftDate(date,1))}
                disabled={dateToHtmlDateString(date) === dateToHtmlDateString(new Date())}
            >
                <ArrowRightIcon/>
            </IconButton>
        </div>
    )
}

export default DateNavigator;