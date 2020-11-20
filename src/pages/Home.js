import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import CancelIcon from '@material-ui/icons/Cancel';
import FastForwardIcon from '@material-ui/icons/FastForward';


/** Home description */
class Home extends Component {

    constructor() {
        super();
        this.state = {
            showPlay: true,
            showCancel: false,
            showPause: false,
            showForward: false
        };
        this.alternateButtons = this.alternateButtons.bind(this);
    }

    alternateButtons() {
        this.setState({ showPlay: !this.state.showPlay });
        this.setState({ showCancel: !this.state.showCancel });
        this.setState({ showPause: !this.state.showPause });
        this.setState({ showForward: !this.state.showForward });
    }

    /**
     * This is the home page.
     */
    render() {
        const { showPlay, showCancel, showPause, showForward } = this.state
        return (
            <div className="Home">
                { showPlay &&
                    <IconButton aria-label="play">
                    <PlayIcon style={{ fontSize: '75px', color: '#015384'}} onClick={this.alternateButtons} />
                    </IconButton>
                }
                { showCancel &&
                    <IconButton aria-label="cancel">
                    <CancelIcon style={{ fontSize: '75px', color: '#015384' }} onClick={this.alternateButtons} />
                    </IconButton>
                } 
                { showPause &&
                    <IconButton aria-label="pause">
                    <PauseIcon style={{ fontSize: '75px', color: '#015384' }} onClick={this.alternateButtons} />
                    </IconButton>
                }
                { showForward &&
                    <IconButton aria-label="forward">
                    <FastForwardIcon style={{ fontSize: '75px', color: '#015384' }} onClick={this.alternateButtons} />
                    </IconButton>
                }
            </div>
        )
    }
}

export default Home;