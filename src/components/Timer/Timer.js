
import React, {useState} from 'react';
import ClockFace from './ClockFace';
import TimerButtons from './TimerButtons';
import useTimerGlobalState from '../../GlobalState/useTimerGlobalState';

/**
 * Timer
 * @desc Timer handles the functionality and logic of a countdown timer.
 * @implements {React.Component}
 */
function Timer (props) {
    const [ timerId, setTimerId ] = useState(-1); //timerId for setInterval & clearInterval
    const { timer, dispatch, TimerActions } = useTimerGlobalState()

    const startTimer = () => {
        let tid = setInterval(
            () => dispatch(TimerActions.DECREMENT), //for every second, 
            1000 //1 second
        )
        setTimerId(tid)
    }
    
    const pauseTimer = () => {
        clearInterval(timerId);
        dispatch(TimerActions.PAUSE);
    }

    const resetTimer = () => {
        clearInterval(timerId);
        dispatch(TimerActions.RESET);
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