import './App.css';
import { GlobalStateProvider } from './GlobalState/GlobalState'
import Home from './pages/Home.js';
import Settings from './pages/Settings.js';


function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <header className="App-header">
          <Home/>
          {/* <Settings/> */}
        </header>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
