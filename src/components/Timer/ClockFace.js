import React from 'react';

/**
 * ClockFace
 * @desc The visual component of our timer that displays the time remaining as text in a 
 * circular clockface.
 */

 function ClockFace({min, sec}) {
    const min_present = min < 10 ? '0' + min : min.toString()
    const sec_present = sec < 10 ? '0' + sec : sec.toString()
    const time_present = min_present + ':' + sec_present
     return (
        <div className='clock-face'>
            <h1 data-testid="timer-min-sec-text">{time_present}</h1>
        </div>
    )
 }
 
export default ClockFace;
