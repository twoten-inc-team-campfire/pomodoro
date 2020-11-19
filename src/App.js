import logo from './logo.svg';
import './App.css';
import ClockTimer from './components/ClockTimer';
import ExampleManager from './components/ExampleManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExampleManager 
          timer={
            <ClockTimer minutes={5} />
          }
        />
      </header>
    </div>
  );
}

export default App;
