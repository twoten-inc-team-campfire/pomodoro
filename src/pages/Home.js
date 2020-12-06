import React from 'react';
import TaskSelector from '../components/Timer/TaskSelector';
import Timer from '../components/Timer/Timer';

function Home () {
    return (
        <div>
            <h1>Pomodoro Timer</h1> 
            <TaskSelector/>
            <Timer/>
        </div>
    )
}

export default Home
