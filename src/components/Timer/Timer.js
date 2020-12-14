
import React, { useState } from 'react';
import ClockFace from './ClockFace';
import TimerButtons from './TimerButtons';
import { useTimerGlobalState } from '../../GlobalState/GlobalStateHooks';

/**
 * Timer
 * @desc Timer handles the functionality and logic of a countdown timer.
 * @implements {React.Component}
 */
function Timer (props) {

    const { timer, dispatch, TimerActions } = useTimerGlobalState()
    const { onStart, onPause, onCancel, onComplete } = props;

    const startTimer = () => {
        // start the timer
        if (timer.timerId == -1) {
            let tid = setInterval(
                () => dispatch(TimerActions.DECREMENT(onComplete, tid)), //for every second, 
                1000 //1 second
            )
        }


        if (onStart) onStart();
    }

    const pauseTimer = () => {
        dispatch(TimerActions.PAUSE());

        if (onPause) onPause();
    }

    const resetTimer = () => {
        dispatch(TimerActions.RESET());

        if (onCancel) onCancel();
    }

    return (
        <div className={'timer'}>
            <ClockFace min={timer.min} sec={timer.sec}/>
            <TimerButtons
                showStartButton={!timer.isTimerRunning}
                onClickStart={startTimer}
                onClickPause={pauseTimer}
                onClickCancel={resetTimer}
            />
        </div>
    )
}


export default Timer;