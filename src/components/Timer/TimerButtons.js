import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import CancelIcon from '@material-ui/icons/Cancel';
// import FastForwardIcon from '@material-ui/icons/FastForward';


/**
 * TimerButtons
 * @desc Allows users to start, pause, and cancel the current pomodoro
 * session.
 */
function TimerButtons ({onClickStart, onClickPause, onClickCancel}) {
    const [showPlay, setShowPlay] = useState(true);

    /**
     * handlePlay
     * @desc Starts the timer and hides the play button.
     */
    const handlePlay = () => {
        setShowPlay(!showPlay)
        if (onClickStart) { onClickStart() }
    }
    
    /**
     * handlePause
     * @desc Pauses the timer and shows the play button.
     */
    const handlePause = () => {
        setShowPlay(!showPlay)
        if (onClickPause) { onClickPause() }
    }

    /**
     * handleCancel
     * @desc Resets the timer and shows the play button.
     */
    const handleCancel = () => {
        setShowPlay(!showPlay)
        if (onClickPause) { onClickCancel() }
    }
    
    return (
        <div className="timer-buttons">
            { showPlay &&
                <IconButton aria-label="start-button" onClick={handlePlay} >
                    <PlayIcon style={{ fontSize: '75px', color: '#015384'}} />
                </IconButton>
            }
            { !showPlay && 
                <span>
                    <IconButton aria-label="pause-button" onClick={handlePause} >
                        <PauseIcon style={{ fontSize: '75px', color: '#015384' }} />
                    </IconButton>
                    <IconButton aria-label="cancel-button" onClick={handleCancel} >
                        <CancelIcon style={{ fontSize: '75px', color: '#015384' }} />
                    </IconButton>
                </span>
            }
        </div>
    )
}

// this is the fastforward button, don't need it for now.
// { showForward &&
//     <IconButton aria-label="forward">
//         <FastForwardIcon style={{ fontSize: '75px', color: '#015384' }} onClick={this.alternateButtons} />
//     </IconButton>
// }

export default TimerButtons;