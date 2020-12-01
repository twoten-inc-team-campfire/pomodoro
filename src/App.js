import './App.css';
import { GlobalStateProvider } from './GlobalState/GlobalState'
import Home from './pages/Home';
import Settings from './pages/Settings';
import Summary from './pages/Summary';
import SwipeableViews from 'react-swipeable-views';

/**
The "App" style originally comes with create-react-app.
It seems like we have adopted to use this as our default theme.
Let's extract that into a component so that all pages can use the same theme
**/
const StyleWrapper = (props) => {
	const SlideStyles = {
		padding: 0.5
	}
	return (
		<div className="App" style={SlideStyles}>
			<header className="App-header">
				{props.children}
			</header>
		</div>
	)
}

function App() {
  return (
    <GlobalStateProvider>
	    <SwipeableViews enableMouseEvents resistance index={1}>
	    	<StyleWrapper> <Settings/> </StyleWrapper>
	    	<StyleWrapper> <Home/> </StyleWrapper>
	    	<StyleWrapper> <Summary/> </StyleWrapper>
	    </SwipeableViews>
    </GlobalStateProvider>
  );
}

export default App;
