import './../App.css';
import React from 'react';
import Timer from '../components/Timer/Timer';

function Home () {
    return (
    	<div>
			<h1>Pomodoro Timer</h1>
			<Timer/>
		</div>
    )
}

export default Home
