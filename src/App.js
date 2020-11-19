import logo from './logo.svg';
import './App.css';
import ClockTimer from './components/ClockTimer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClockTimer minutes={5}/>
      </header>
    </div>
  );
}

export default App;
