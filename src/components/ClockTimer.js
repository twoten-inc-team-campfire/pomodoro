import React from 'react';
import {TimerInterface} from "../parts/PomodoroManager";

/**
 * ClockTimer
 * @desc A visual timer that displays the time remaining as text in a circular clockface.
 * @implements {TimerInterface}
 */
class ClockTimer extends TimerInterface {

    constructor(props) {
        super(props);

        this.state = {
            total_duration: props.minutes,
            minutes: props.minutes,
            seconds: 0
        };

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    start() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    pause() {}

    reset() {}

    render() {
        return (
            <div>
                <h1>Second clock timer</h1>
                <h2>{this.printTime()}</h2>
            </div>
        )
    }

    tick() {
        
        if (this.isFinished()) {

        }
        else {
            this.decrementTime();
        }
        
    }

    decrementTime() {

        this.setState(function(state, props) {
            if (state.seconds === 0) {
                return {
                    seconds: 59,
                    minutes: state.minutes - 1
                }
            } else {
                return {
                    seconds: state.seconds - 1
                }
            }
        });
    }

    isFinished() {
        return (this.state.seconds === 0 && this.state.minutes === 0);
    }

    printTime() {
        var seconds_str = this.state.seconds.toString();
        if (this.state.seconds < 10) {
            seconds_str = '0' + seconds_str;
        }

        return this.state.minutes.toString() + ':' + seconds_str;
    }

}

export default ClockTimer;