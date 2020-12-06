import React, {useState} from 'react';
import TaskSelector from '../components/Timer/TaskSelector';
import Timer from '../components/Timer/Timer';

function Home () {
	const [task, setTask] = useState('');
	console.log("home's task", task);
    return (
        <div>
            <h1>Pomodoro Timer</h1> 
            <TaskSelector onConfirmTask={setTask}/>
            <Timer/>
        </div>
    )
}

export default Home
