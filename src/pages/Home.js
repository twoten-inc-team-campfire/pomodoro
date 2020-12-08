import React from 'react';
import TaskSelector from '../components/Timer/TaskSelector';
import { PomodoroManager } from '../parts/PomodoroManager';
import { saveTimerSession } from "../services/DataService"

function Home () {
    const onNewTimerSession = (timerSession) => {
        saveTimerSession(timerSession)
    }

    return (
        <div>
            <h1>Pomodoro Timer</h1>
            <center><TaskSelector/></center>
            <PomodoroManager onNewTimerSession={onNewTimerSession}/>
        </div>
    )
}

export default Home
