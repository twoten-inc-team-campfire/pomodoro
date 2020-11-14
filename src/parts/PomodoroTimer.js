import React, {Component} from 'react';
import {UserSettings} from "../classes/settings/UserSettings";
import {TimerSession} from "../classes/TimerSession";

/**
 * PomodoroTimer that encapsulates the pomodoro logic applied to a timer object.
 * @component
 */
class PomodoroTimer extends Component {

    /**
     * The props being passed to the PomodoroTimer
     * @type {{settings: UserSettings, completeTimerSession: PomodoroTimer_OnNewTimerSession, Timer: React.Component}}
     */
    static propTypes = {
        /**
         * The React Component timer to be rendered.
         * The timer should support the following
         */
        Timer: React.Component,
        /**
         * The user's settings.
         */
        settings: UserSettings,
        /**
         * Function allowing PomodoroTimer to pass a completed TimerSession to its parent.
         * @name PomodoroTimer_OnNewTimerSession
         * @function
         * @param {TimerSession} The TimerSession being passed to the parent.
         */
        onNewTimerSession: Function
    }

    constructor(props) {
        super(props);
    }

    /**
     * Public function to start/resume the PomodoroTimer
     */
    start() {

    }

    /**
     * Public function to pause the PomodoroTimer
     * This should return a TimerSession to the parent for the time elapsed.
     */
    pause() {

    }

    /**
     * Public function to reset the timer back to the beginning of the current cycle.
     * This should not return a TimerSession to the parent.
     */
    reset() {

    }

    /**
     * Public function to skip to the end of the current part of the cycle.
     * This should return a TimeSession for the duration the timer ran.
     * If the timer has not started running, return nothing.
     */
    skip() {

    }

    render() {
        return (
            <div className="Home">
                Home page with timer.
            </div>
        )
    }
}

/**
 * Interface for timer Components that are compatible with the PomodoroTimer
 */
class TimerInterface extends React.Component {

    /**
     * The props being passed to Timers compatible with PomodoroTimer.
     * @type {{duration: number, onComplete: TimerInterface_OnComplete}}
     */
    static propTypes = {
        /**
         * Duration of the timer in milliseconds
         */
        duration: Number,
        /**
         * Function to notify parent when the timer completes
         * @name TimerInterface_OnComplete
         * @function
         */
        onComplete: Function,
    }

    constructor(props) {
        super()
    }

    /**
     * Public method to start timer.
     */
    start() {
        throw new Error("Start method not implemented")
    }

    /**
     * Public method to pause the timer.
     */
    pause() {
        throw new Error("Pause method not implemented")
    }

    /**
     * Public method to reset the timer.
     */
    reset() {
        throw new Error("Reset method not implemented")
    }

}

export { PomodoroTimer, TimerInterface };