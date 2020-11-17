import React, {Component} from 'react';
import {UserSettings} from "../classes/settings/UserSettings";
import {TimerSession} from "../classes/TimerSession";

/**
 * PomodoroManager that encapsulates the pomodoro logic applied to a timer object.
 * @component
 */
class PomodoroManager extends Component {

    /**
     * The props being passed to the PomodoroManager
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
         * Function allowing PomodoroManager to pass a completed TimerSession to its parent.
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
     * Public function to start/resume the PomodoroManager
     */
    start() {

    }

    /**
     * Public function to pause the PomodoroManager
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
        return "Display the timer here"
    }
}

/**
 * Interface for timer Components that are compatible with the PomodoroManager
 */
class TimerInterface extends React.Component {

    /**
     * The props being passed to Timers compatible with PomodoroManager.
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

export { PomodoroManager, TimerInterface };