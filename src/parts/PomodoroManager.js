import React, { useContext, useState, useCallback, useRef, useEffect } from 'react';
import { TimerSession, TIMER_SESSION_TYPE } from "../classes/TimerSession";
import Timer from "../components/Timer/Timer";
import { useTimerGlobalState, useSettingsGlobalState, useManagerGlobalState } from '../GlobalState/GlobalStateHooks';
import { forward } from '../GlobalState/PomodoroManagerReducerAndActions'

const stateSimulate = (settings, manager) => {
    return {
        settings: settings,
        manager: manager,
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

    const {
        settings,
        dispatch,
        SettingsActions
    } = useSettingsGlobalState()
    const  {
        timer,
        dispatchTimer,
        TimerActions
    } = useTimerGlobalState()
    const {
        manager,
        dispatchManager,
        ManagerActions
    } = useManagerGlobalState()
    
    useEffect(() => {
        const newTimer = newTime(manager.type)
        dispatchTimer(TimerActions.RESET(newTimer));
    }, [settings.focusLength, settings.shortBreakLength, settings.longBreakLength,
        manager.type, 
    ])

    /*
     * Callback to pass a new TimerSession to the parent.
     * @callback onNewTimerSession
     * @param {TimerSession} newTimerSession - New TimerSession the PomodoroManager just created
     * @memberOf PomodoroManager
     */ 
    const onStart = () => {
        startTime.current = new Date(Date.now());
    }

    const onPause = () => {
        endTime.current = new Date(Date.now());

        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, manager.type));
        }

        startTime.current = null;
        endTime.current = null;
    }

    const onCancel = () => {
        endTime.current = new Date(Date.now());
        
        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, manager.type));
        }

        startTime.current = null;
        endTime.current = null;

        let type = manager.type;
        return newTime(type)
    }

    const onComplete = () => {
        endTime.current = new Date(Date.now());

        if (startTime.current && endTime.current) {
            onNewTimerSession(new TimerSession(startTime.current, endTime.current, manager.type));
        }

        startTime.current = null;
        endTime.current = null;
        
        let {type} = forward(stateSimulate(settings, manager));
        dispatchManager(ManagerActions.NEXT());

        return newTime(type)
    }

    const newTime = (pomo_type) => {
        if (pomo_type === TIMER_SESSION_TYPE.POMODORO) {
            return {
                min: settings.focusLength,
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
            <h2>{textGeneration(manager.type)}</h2>
            <Timer 
                onStart={onStart}
                onPause={onPause}
                onCancel={onCancel}
                onComplete={onComplete}
            />
        </div>
    )
}

export { PomodoroManager };