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
        <div>
            <h1>Third clock timer</h1>
            <h2>{time_present}</h2>
        </div>
    )
 }
 
export default ClockFace;
