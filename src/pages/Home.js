import React, {useState} from 'react';
import TaskSelector from '../components/Timer/TaskSelector';
import Timer from '../components/Timer/Timer';
import { PomodoroManager } from '../parts/PomodoroManager'
import { saveTimerSession } from "../services/DefaultDataService"

function Home () {
    const [task, setTask] = useState(null);
    const onTaskChange = (task) => {setTask(task)}

    const onNewTimerSession = (timerSession) => {
        timerSession.task = task;
        console.log(timerSession);
        // saveTimerSession(timerSession);
    }
    
    return (
        <div aria-label="home-page">
            <h1>Pomodoro Timer</h1>
            <center><TaskSelector onTaskChange={onTaskChange}/></center>
            <PomodoroManager onNewTimerSession={onNewTimerSession}/>
        </div>
    )
}

export default Home
