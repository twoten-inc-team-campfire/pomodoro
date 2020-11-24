//initial state of the timer
const initTimer = { min: 25, sec: 0 }

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
        return initTimer;
    }
    else if (action.type === 'decrement') {
        return startTimer(state, action);
    } 
    else if (action.type === 'pause') {
        return state;
    }
}

// separate out the logic that decrements the timer. The code should be self-explanatory
const startTimer = (state, action) => {
    if (state.sec === 0 && state.min === 0) {
        //here is when the timer completes
        if (action.onComplete) action.onComplete()
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

//Reducer takes an action and update the state: these are the actions.
const TimerActions = {
	DECREMENT: {
		target: 'Timer',
		type: 'decrement',
        onComplete: undefined
	},
	PAUSE: {
		target: 'Timer',
		type: 'pause'
	},
	RESET: {
		target: 'Timer',
		type: 'reset'
	}
};

export { timerReducer, initTimer, TimerActions }