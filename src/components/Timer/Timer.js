
import React, { useState } from 'react';
import ClockFace from './ClockFace';
import TimerButtons from './TimerButtons';
import { useTimerGlobalState } from '../../GlobalState/GlobalStateHooks';

/**
 * Timer
 * @desc Timer handles the functionality and logic of a countdown timer.
 * @implements {React.Component}
 */
<<<<<<< HEAD
function Timer ({ onStart, onPause, onCancel, onComplete }) {
    let tid;
=======
function Timer (props) {
    const [timerId, setTid] = useState(-1)
>>>>>>> 0acc778 (fixed bug: timer never stopped)
    const { timer, dispatch, TimerActions } = useTimerGlobalState()

    const startTimer = () => {
        let tid = setInterval(
            () => dispatch(TimerActions.DECREMENT(onComplete, tid)), //for every second, 
            1000 //1 second
        )
        setTid(tid)
        if (onStart) onStart();
    }

    const pauseTimer = () => {
        clearInterval(timerId);
        dispatch(TimerActions.PAUSE());

        if (onPause) onPause();
    }

    const resetTimer = () => {
        clearInterval(timerId);
        dispatch(TimerActions.RESET());

        if (onCancel) onCancel();
    }

    return (
        <div className={'timer'}>
            <ClockFace min={timer.min} sec={timer.sec}/>
            <TimerButtons
                onClickStart={startTimer}
                onClickPause={pauseTimer}
                onClickCancel={resetTimer}
            />
        </div>
    )
}


export default Timer;