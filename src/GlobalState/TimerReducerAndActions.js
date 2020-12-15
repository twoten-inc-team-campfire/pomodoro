const TimerActionType = {
    DECREMENT: 'decrement',
    PAUSE: 'pause',
    RESET: 'reset'
}
//initial state of the timer
const initTimer = { 
    min: 0, 
    sec: 5,
    isTimerRunning: false,
    timerId: -1
}

//Reducer takes an action and update the state: these are the actions.
const TimerActions = {
    DECREMENT: (onComplete, timerId) => ({
        target: 'Timer',
        type: TimerActionType.DECREMENT,
        onComplete: onComplete,
        timerId: timerId
    }),
    PAUSE: () => ({
        target: 'Timer',
        type: TimerActionType.PAUSE
    }),
    RESET: (newTimer={}) => ({
        target: 'Timer',
        type: TimerActionType.RESET,
        newTimer: newTimer
    })
};

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
const timerReducer = (state, action) => {
    if (action.type === 'reset') {
        clearInterval(state.timerId)
        return {
            ...initTimer, 
            min: action.newTimer.min,
            sec: action.newTimer.sec
        };
    }
    else if (action.type === 'decrement') {
        return decrementTimer(state, action);
    } 
    else if (action.type === 'pause') {
        clearInterval(state.timerId)
        return {...state, 
                timerId: -1,
                isTimerRunning: false};
    }
}

// separate out the logic that decrements the timer. The code should be self-explanatory
const decrementTimer = (state, action) => {
    if (state.sec === 0 && state.min === 0) {
        //inside here is when the timer completes

        //stop the timer
        clearInterval(action.timerId)

        //calls onComplete.
        let newTimer = null
        if (action.onComplete) 
            newTimer = action.onComplete()
        else
            console.warn("onComplete props is not provided to <Timer/>" + 
                    "Therefore nothing happens when timer reaches 00:00");
        //no state change, the time is still 00:00
        let nextTimer;

        if (newTimer) {
            nextTimer = {
                ...state, 
                min: newTimer.min,
                sec: newTimer.sec, 
                timerId: -1,
                isTimerRunning: false
            } 
        } else {
            nextTimer = {
                ...state, 
                timerId: -1,
                isTimerRunning: false
            };
        }
        return nextTimer
    } 
    else if (state.sec === 0) {
        return {
            ...state,
            min: state.min - 1,
            sec: 59,
            timerId: action.timerId,
            isTimerRunning: true
        }
    } 
    else {
        return {
            ...state,
            min: state.min,
            sec: state.sec - 1,
            timerId: action.timerId,
            isTimerRunning: true
        }
    }
}


export { timerReducer, initTimer, TimerActions }