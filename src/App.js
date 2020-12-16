import './App.css';
import React from 'react';
import { GlobalStateProvider } from './GlobalState/GlobalState'

import Home from './pages/Home.js';
import Settings from './pages/Settings.js'
import BottomNavBar from './components/BottomNavBar';
import AppLayout from './components/AppLayout';
import {Statistics} from "./pages/Statistics";


function App() {
  const [value, setValue] = React.useState(0);


  const PageToRender = () => {
    switch (value) {
      case 0:
        return <Home/>
      case 1:
        return <Settings/>
      case 2:
        return <Statistics/>
      default:
        return <div> 404 </div>
    }
  }
  return (
    <GlobalStateProvider>
      <div className="App">
        <header className="App-header">
          <AppLayout 
            PageToRender={PageToRender()}
            ButtomNavBar={<BottomNavBar value={value} setValue={setValue}/>}
          />
        </header>
      </div>
    </GlobalStateProvider>
    )
}

export default App;
