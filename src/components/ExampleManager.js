
import React from 'react';
import {TimerInterface} from "../parts/PomodoroManager";
import Button from '@material-ui/core/Button';

/**
 * ExampleManager
 * @desc An example manage component used to test ClockTimer functionality.
 * @implements {React.Component}
 */
class ExampleManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: props.timer,
        };
    }

    render() {
        return (
            <div className={'example-manager'}>
                {this.state.timer}
                <Button variant="contained" color="primary"
                    className="start" 
                    onClick={this.state.timer.start}>
                    Start
                </Button>
                <Button variant="contained" color="primary"
                    className="pause" 
                    onClick={this.state.timer.pause}>
                    Pause
                </Button>
                <Button variant="contained" color="primary"
                    className="reset" 
                    onClick={this.state.timer.reset}>
                    Reset
                </Button>
            </div>
        )
    }

    

}

export default ExampleManager;