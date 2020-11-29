import React from 'react';
import { PomodoroManager } from '../parts/PomodoroManager';

function Home () {
    const onNewTimerSession = (timerSession) => {
        console.log(timerSession.getDuration())
        console.log(timerSession.type)
    }

    return (
        <div>  
            <PomodoroManager onNewTimerSession={onNewTimerSession}/>
        </div>
    )
}

export default Home
