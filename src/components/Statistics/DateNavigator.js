import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';


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

    /**
     * changeDate
     * @param {number} offset
     * @returns {Date}
     */
    function changeDate(offset) {
        let time = date.getTime()
        time += (offset * 86400000)
        return new Date(time)
    }

    /**
     * displayDate
     * @param {Date} date
     * @returns {string}
     */
    function displayDate(date) {
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString(); // JS indexes months 0 - 11, so we need to increment. WHY!?
        if (month.length < 2) // Unfortunately, HTML required that the length of the months be EXACTLY 2 digits.
            month = "0" + month;
        let day = date.getDate().toString(); // Likewise, the length of the days must be EXACTLY 2 digits.
        if (day.length < 2)
            day = "0" + day;
        return `${year}-${month}-${day}`;
    }

    /**
     *
     * @param {string} str
     * @returns {Date}
     */
    function strToDate(str) {
        let substrs = str.split('-');
        let newDate = new Date();
        newDate.setFullYear(parseInt(substrs[0]), parseInt(substrs[1])+1, parseInt(substrs[2]));
        return newDate;
    }
    return (
        <div style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
            <IconButton
                onClick={() => onDateChange(date, changeDate(-1))}
            >
                <ArrowLeftIcon/>
            </IconButton>
            <input type="date"
                   value={displayDate(date)}
                   style={{border: "none"}}
                   onInput={(ev) => onDateChange(date, strToDate(ev.target.value))}
                   max={displayDate(new Date())}
            />
            <IconButton
                onClick={() => onDateChange(date, changeDate(1))}
                disabled={displayDate(date) === displayDate(new Date())}
            >
                <ArrowRightIcon/>
            </IconButton>
        </div>
    )
}

export default DateNavigator;