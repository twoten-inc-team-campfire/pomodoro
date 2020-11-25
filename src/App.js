import './App.css';
import { GlobalStateProvider } from './GlobalState/GlobalState'
import Home from './pages/Home.js';


function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <header className="App-header">
          <h1>Pomodoro Timer</h1>
          <Home/>
        </header>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
