import React, { useContext, useState, useCallback, useRef } from 'react';
import { GlobalStateContext } from '../GlobalState/GlobalState';
import { TimerSession, TIMER_SESSION_TYPE } from "../classes/TimerSession";
import Timer from "../components/Timer/Timer";
import { useTimerInitGlobalState } from '../GlobalState/GlobalStateHooks';
import { TimerInitActions } from '../GlobalState/TimerInitReducerAndActions';
import { useTimerGlobalState } from '../GlobalState/GlobalStateHooks';

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

const sessionTypeToAction = (type) => {
    switch(type) {
        case TIMER_SESSION_TYPE.POMODORO:
            return TimerInitActions.POMODORO;
        case TIMER_SESSION_TYPE.LONG_REST:
            return TimerInitActions.LONG_REST;
        case TIMER_SESSION_TYPE.SHORT_REST:
            return TimerInitActions.SHORT_REST;
        default:
            throw new Error('Unexpected type');
    }
}

const textGeneration = (type) => {
    switch(type) {
        case TIMER_SESSION_TYPE.POMODORO:
            return "Focus";
        case TIMER_SESSION_TYPE.LONG_REST:
            return "Long Break";
        case TIMER_SESSION_TYPE.SHORT_REST:
            return "Short Break";
        default:
            throw new Error('Unexpected type');
    }
}

/**
 * PomodoroManager
 * @desc PomodoroManager that encapsulates the pomodoro logic applied to a timer object.
 * @component
 */
function PomodoroManager ({onNewTimerSession}) {

    let startTime = useRef(null);
    let endTime = useRef(null);
    let onNewTimerSessionRef = useRef(onNewTimerSession);

    const { dispatch } = useTimerInitGlobalState();
    
    const [state] = useContext(GlobalStateContext);
    const timerDispatch = useTimerGlobalState().dispatch;
    const { TimerActions } = useTimerGlobalState();
    
    const initState = {
        type: TIMER_SESSION_TYPE.POMODORO,
        count: 0,
        sessionIngterval: state.settings.focusCycleCount,
    };

    const [managerState, setManagerState] = useState(initState);

    /**
     * Callback to pass a new TimerSession to the parent.
     * @callback onNewTimerSession
     * @param {TimerSession} newTimerSession - New TimerSession the PomodoroManager just created
     * @memberOf PomodoroManager
     */

    const onStart = useCallback(() => {
        startTime.current = new Date(Date.now());
    }, [])

    const onPause = useCallback(() => {
        endTime.current = new Date(Date.now());

        if (startTime.current && endTime.current) {
            onNewTimerSessionRef.current(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
    }, [managerState])

    const onComplete = useCallback(() => {
        endTime.current = new Date(Date.now());

        if (startTime.current && endTime.current) {
            onNewTimerSessionRef.current(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
        
        let {type} = forward(managerState);
        setManagerState(forward(managerState));
        dispatch(sessionTypeToAction(type)());
        timerDispatch(TimerActions.RESET())
    }, [managerState, dispatch, timerDispatch, TimerActions])

    const onCancel = useCallback(() => {
        endTime.current = new Date(Date.now());
        
        if (startTime.current && endTime.current) {
            onNewTimerSessionRef.current(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
    }, [managerState])

    return (
        <div className={'pomodoroManager'}>
            <h2>{textGeneration(managerState.type)}</h2>
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