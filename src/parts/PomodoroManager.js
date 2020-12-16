import React, { useState, useRef, useEffect } from 'react';
import { TimerSession, TIMER_SESSION_TYPE } from "../classes/TimerSession";
import Timer from "../components/Timer/Timer";
import { useTimerGlobalState, useSettingsGlobalState } from '../GlobalState/GlobalStateHooks';



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

    const { settings } = useSettingsGlobalState();
    const  {
        dispatchTimer,
        TimerActions
    } = useTimerGlobalState()

    const initState = {
        type: TIMER_SESSION_TYPE.POMODORO,
        count: 0,
        sessionIngterval: settings.numPomodorosInCycle,
    };

    const [managerState, setManagerState] = useState(initState);
    
    useEffect(() => {
        const newTimer = newTime(managerState.type)
        dispatchTimer(TimerActions.RESET(newTimer));
    }, [settings.pomodoroLength, settings.shortBreakLength, settings.longBreakLength,
        managerState.type, 
    ])

    /*
     * Callback to pass a new TimerSession to the parent.
     * @callback onNewTimerSession
     * @param {TimerSession} newTimerSession - New TimerSession the PomodoroManager just created
     * @memberOf PomodoroManager
     */ 
    const onStart = () => {
        startTime.current = new Date();
    }

    const onPause = () => {
        endTime.current = new Date();

        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
    }

    const onCancel = () => {
        endTime.current = new Date(Date.now());
        
        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
        return newTime(managerState.type)
    }

    const onComplete = () => {
        endTime.current = new Date(Date.now());

        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, managerState.type));
        }

        startTime.current = null;
        endTime.current = null;
        
        let {type} = forward(managerState);
        setManagerState(forward(managerState));

        return newTime(type)
    }

    const newTime = (pomo_type) => {
        if (pomo_type === TIMER_SESSION_TYPE.POMODORO) {
            return {
                min: settings.pomodoroLength,
                sec: 0
            };
        }
        else if (pomo_type === TIMER_SESSION_TYPE.LONG_REST) {
            return {
                min: settings.longBreakLength,
                sec:0
            }
        } 
        else if (pomo_type === TIMER_SESSION_TYPE.SHORT_REST) {
            return {
                min: settings.shortBreakLength,
                sec: 0
            }
        }
    }

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

export { PomodoroManager, forward };