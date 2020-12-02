import React, {useReducer} from 'react';
import {TimerSession, TIMER_SESSION_TYPE} from "../classes/TimerSession";
import Timer from "../components/Timer/Timer"

const initState = {
    type: TIMER_SESSION_TYPE.POMODORO,
    count: 0,
    sessionIngterval: 4
}

const forward = (state) => {
    let type = state.type;
    let count = state.count;
    let sessionIngterval = state.sessionIngterval;
    
    switch(type) {
        case TIMER_SESSION_TYPE.POMODORO:
            if (count === sessionIngterval - 1) {
                type = TIMER_SESSION_TYPE.LONG_REST;
            }
            else {
                type = TIMER_SESSION_TYPE.SHORT_REST;
            }
            count = (count + 1) % sessionIngterval;
            return {
                type: type,
                count: count,
                sessionIngterval: state.sessionIngterval
            }
        case TIMER_SESSION_TYPE.SHORT_REST:
        case TIMER_SESSION_TYPE.LONG_REST:
            type = TIMER_SESSION_TYPE.POMODORO;
            return {
                type: type,
                count: count,
                sessionIngterval: state.sessionIngterval
            }
        default:
            throw new Error('Unexpected type');
    }
}

const managerReducer = (state, action) => {
    if (action === PomodoroManagerAction.NEXT) {
        return forward(state);
    }
    else {
        throw new Error('Unexpected action');
    }
}

const PomodoroManagerAction = {
    NEXT: 'next'
}

/**
 * PomodoroManager
 * @desc PomodoroManager that encapsulates the pomodoro logic applied to a timer object.
 * @component
 */
function PomodoroManager ({onNewTimerSession}) {

    const [state, dispatch] = useReducer(managerReducer, initState);
    let startTime = null;
    let endTime = null;

    /**
     * Callback to pass a new TimerSession to the parent.
     * @callback onNewTimerSession
     * @param {TimerSession} newTimerSession - New TimerSession the PomodoroManager just created
     * @memberOf PomodoroManager
     */

    const onStart = () => {
        startTime = Date.now();
    }

    const onPause = () => {
        endTime = Date.now();

        if (startTime && endTime) {
            onNewTimerSession(new TimerSession(startTime, endTime, state.type));
        }

        startTime = null;
        endTime = null;
    }

    const onComplete = () => {
        endTime = Date.now();

        if (startTime && endTime) {
            onNewTimerSession(new TimerSession(startTime, endTime, state.type));
        }

        startTime = null;
        endTime = null;
        
        dispatch(PomodoroManagerAction.NEXT);
    }

    const onCancel = () => {
        endTime = Date.now();
        
        if (startTime && endTime) {
            onNewTimerSession(new TimerSession(startTime, endTime, state.type));
        }

        startTime = null;
        endTime = null;
    }

    return (
        <div className={'pomodoroManager'}>
            <Timer 
                onStart={onStart}
                onPause={onPause}
                onCancel={onCancel}
                onComplete={onComplete}
            />
        </div>
    )
}

export { PomodoroManager, initState, forward };