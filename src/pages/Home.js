import React, {useState} from 'react';
import TaskSelector from '../components/Timer/TaskSelector';
import Timer from '../components/Timer/Timer';
import { PomodoroManager } from '../parts/PomodoroManager'
import { saveTimerSession } from "../services/DefaultDataService"

function Home () {
    const onNewTimerSession = (timerSession) => {
        saveTimerSession(timerSession)
    }
    
    return (
        <div aria-label="home-page">
            <h1>Pomodoro Timer</h1>
            <center><TaskSelector/></center>
            <PomodoroManager onNewTimerSession={onNewTimerSession}/>
        </div>
    )
}

export default Home
