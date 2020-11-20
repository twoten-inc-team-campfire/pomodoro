import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import ClockTimer from './components/ClockTimer';
import TimerManager from './components/TimerManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimerManager/>
      </header>
    </div>
      
  );
}

export default App;
