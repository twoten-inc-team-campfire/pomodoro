
import React from 'react';
import ClockFace from './ClockFace';
import TimerButtons from './TimerButtons';
import { useTimerGlobalState } from '../../GlobalState/GlobalStateHooks';

/**
 * Timer
 * @desc Timer handles the functionality and logic of a countdown timer.
 * @implements {React.Component}
 */
function Timer (props) {

    const { timer, dispatchTimer, TimerActions } = useTimerGlobalState()
    const { onStart, onPause, onCancel, onComplete, newTimer } = props;

    const startTimer = () => {
        // start the timer
        if (timer.timerId === -1) {
            dispatchTimer(TimerActions.DECREMENT(onComplete, -1))
            let tid = setInterval(
                () => dispatchTimer(TimerActions.DECREMENT(onComplete, tid)), //for every second, 
                1000 //1 second
            )
        }

        if (onStart) onStart();
    }

    const pauseTimer = () => {
        dispatchTimer(TimerActions.PAUSE());

        if (onPause) onPause();
    }

    const resetTimer = () => {
        dispatchTimer(TimerActions.RESET(newTimer));

        if (onCancel) onCancel();
    }

    //should only show the start button when when the timer is not running
    const showStartButton = (timer.min === 0 && timer.sec === 0) || //timer reaches 0 == timer is not running
                            !timer.isTimerRunning  //timer is not running

    return (
        <div className={'timer'}>
            <ClockFace min={timer.min} sec={timer.sec}/>
            <TimerButtons
                showStartButton={showStartButton}
                onClickStart={startTimer}
                onClickPause={pauseTimer}
                onClickCancel={resetTimer}
            />
        </div>
    )
}


export default Timer;