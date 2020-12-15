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
 * @param {onDateChange} onDateChange - The callback to be called whenever the date changes.
 * @param {Date} maxDate - The latest date the user is allowed to navigate to
 */
function DateNavigator({date, onDateChange, maxDate = new Date()}) {
    return (
        <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center"}}
            aria-label={"Date selector"}
        >
            <IconButton
                name={"Decrease"}
                aria-label={"Decrease date"}
                onClick={() => onDateChange(date, shiftDate(date,-1))}
            >
                <ArrowLeftIcon/>
            </IconButton>
            <input type="date"
                   name={"Date input"}
                   aria-label={"Date input"}
                   value={dateToHtmlDateString(date)}
                   style={{border: "none"}}
                   onChange={(ev) => onDateChange(date, htmlDateStringToDate(ev.target.value))}
                   max={dateToHtmlDateString(maxDate)}
            />
            <IconButton
                name={"Increase"}
                aria-label={"Increase date"}
                onClick={() => onDateChange(date, shiftDate(date,1))}
                disabled={dateToHtmlDateString(date) === dateToHtmlDateString(maxDate)}
            >
                <ArrowRightIcon/>
            </IconButton>
        </div>
    )
}

export default DateNavigator;