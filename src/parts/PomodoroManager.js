import React, {Component} from 'react';
import {UserSettings} from "../classes/settings/UserSettings";
import {TimerSession} from "../classes/TimerSession";

/**
 * PomodoroManager
 * @desc PomodoroManager that encapsulates the pomodoro logic applied to a timer object.
 * @component
 */
class PomodoroManager extends Component {

    /**
     * Callback to pass a new TimerSession to the parent.
     * @callback onNewTimerSession
     * @param {TimerSession} newTimerSession - New TimerSession the PomodoroManager just created
     * @memberOf PomodoroManager
     */
    /**
     * @constructs
     * @param {Object} props - Props passed to component.
     * @param {TimerInterface} props.Timer - The React Component timer to be rendered. It should support the
     * TimerInterface interface.
     * @param {UserSettings} props.UserSettings - The user's settings
     * @param {onNewTimerSession} props.onNewTimerSession - Callback to pass a new TimerSession to the parent
     */
    constructor(props) {
        super(props);
    }

    /**
     * @desc Public function to start/resume the PomodoroManager
     * @public
     */
    start() {

    }

    /**
     * @desc Public function to pause the PomodoroManager
     * This should return a TimerSession to the parent for the time elapsed.
     * @public
     */
    pause() {

    }

    /**
     * @desc Public function to reset the timer back to the beginning of the current cycle.
     * This should not return a TimerSession to the parent.
     * @public
     */
    reset() {

    }

    /**
     * @desc Public function to skip to the end of the current part of the cycle.
     * This should return a TimeSession for the duration the timer ran.
     * If the timer has not started running, return nothing.
     * @public
     */
    skip() {

    }

    render() {
        return "Display the timer here"
    }
}

/**
 * @interface TimerInterface
 * @desc Interface for timer Components that are compatible with the PomodoroManager
 */
class TimerInterface extends React.Component {

    /**
     * Callback to notify the parent that the timer has completed.
     * @callback onComplete
     * @param {Date} endTime - Time at which the timer finished.
     * @memberOf TimerInterface
     */
    /**
     * @lends TimerInterface
     * @constructs
     * @param {Object} props - Props passed to the component.
     * @param {number} props.duration - Duration of the timer in milliseconds
     * @param {onComplete} props.onComplete - Callback to notify the parent that the timer has completed.
     */
    constructor(props) {
        super(props)
    }

    /**
     * @desc Public method to start timer.
     * @public
     */
    start() {
        throw new Error("Start method not implemented")
    }

    /**
     * @desc Public method to pause the timer.
     * @public
     */
    pause() {
        throw new Error("Pause method not implemented")
    }

    /**
     * @desc Public method to reset the timer.
     * @public
     */
    reset() {
        throw new Error("Reset method not implemented")
    }

}

export { PomodoroManager, TimerInterface };