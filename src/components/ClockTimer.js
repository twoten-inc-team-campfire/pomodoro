import React from 'react';
import {TimerInterface} from "../parts/PomodoroManager";

/**
 * ClockTimer
 * @desc A visual timer that displays the time remaining as text in a circular clockface.
 * @implements {TimerInterface}
 */
class ClockTimer extends TimerInterface {
    
    constructor(props) {
        super(props)
    }

    start() {}

    pause() {}

    reset() {}

    render() {}
}

export default ClockTimer;