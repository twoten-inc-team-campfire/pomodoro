import {TIMER_SESSION_TYPE} from "../classes/TimerSession";

//Reducer takes an action and update the state: these are the actions.
const TimerInitActions = {
    POMODORO: () => ({
        target: 'TimerInit',
        type: TIMER_SESSION_TYPE.POMODORO
    }),
    LONG_REST: () => ({
        target: 'TimerInit',
        type: TIMER_SESSION_TYPE.LONG_REST
    }),
    SHORT_REST: () => ({
        target: 'TimerInit',
        type: TIMER_SESSION_TYPE.SHORT_REST
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
const timerInitReducer = (state, action) => {
    if (action.type === TIMER_SESSION_TYPE.POMODORO) {
        return generateTime(state.settings.focusLength);
    }
    else if (action.type === TIMER_SESSION_TYPE.LONG_REST) {
        return generateTime(state.settings.longBreakLength);
    } 
    else if (action.type === TIMER_SESSION_TYPE.SHORT_REST) {
        return generateTime(state.settings.shortBreakLength);
    }
}

// construct a time object based on the minute
const generateTime = (min) => {
    return {
        min: min,
        sec: 0,
    }
}

export { timerInitReducer, TimerInitActions }