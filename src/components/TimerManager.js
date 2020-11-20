
import React, {useState, useReducer} from 'react';
import {TimerInterface} from "../parts/PomodoroManager";
import Button from '@material-ui/core/Button';
import Timer from './ClockTimer';
import TimerButtons from './TimerButtons';
/**
 * ExampleManager
 * @desc An example manage component used to test ClockTimer functionality.
 * @implements {React.Component}
 */

//To avoid using pure string every where, I make them as constants here.
const TimerAction = {
    RESET: 'reset', 
    DECREMENT: 'decrement', 
    PAUSE: 'pause'
}

//initial state of the timer
const initTime = { min: 0, sec: 10 }

/* timer reducer to work with useReducer Hooks in react
 *
 * Arguments:
 *    @state: the current state of the app (like above, it contains the min and sec)
 *    @action: the "description" about what you want to do with the state
 * 
 * What this function does:
 *        It looks into the "action", understand what the action want us to do with the state, 
 *        and implements the logic for that action
 *
 * Return Value:
 *.       return a new state. In this case, it's an object that contains "min" and "sec"
 */
const timeReducer = (state, action) => {
    if (action === TimerAction.RESET) {
        return initTime;
    }
    else if (action === TimerAction.DECREMENT) {
        return decrementTime(state);
    } 
    else if (action === TimerAction.PAUSE) {
        return state;
    }
}

// separate out the logic that decrements the timer. The code should be self-explanatory
const decrementTime = (state) => {
    if (state.sec === 0 && state.min === 0) {
        return state;
    } 
    else if (state.sec === 0) {
        return {
            min: state.min - 1,
            sec: 59
        }
    } 
    else {
        return {
            min: state.min,
            sec: state.sec - 1
        }
    }
}


function TimerManager (props) {
    const [timerId, setTimerId] = useState(-1)  //timerId for setInterval
    const [time, dispatch] = useReducer(timeReducer, initTime); //timeReducer and initTime are defined above
    const startTimer = () => {
        let tid = setInterval(
            () => tick(),
            1000 //1 second
        )
        setTimerId(tid)
    }

    const tick = () => {
        console.log("clicked start")
        dispatch(TimerAction.DECREMENT);
    }
    
    const pauseTimer = () => {
        clearInterval(timerId);
        dispatch(TimerAction.PAUSE);
    }

    const resetTimer = () => {
        clearInterval(timerId);
        dispatch(TimerAction.RESET);
    }

    return (
        <div className={'example-manager'}>
            <Timer min={time.min} sec={time.sec}/>
            <TimerButtons
                onClickStart={startTimer}
                onClickPause={pauseTimer}
                onClickCancel={resetTimer}
            />
        </div>
    )
}

export default TimerManager;