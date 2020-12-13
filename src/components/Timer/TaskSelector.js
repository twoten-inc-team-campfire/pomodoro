import React, { useState, Fragment } from 'react';
import './TaskSelector.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';


/**
 * TaskSelector
 * @desc Component that allows users to enter a task for the current
 * pomodoro session.
 */
function TaskSelector() {
    const [showSelector, setShowSelector] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [task, setTask] = useState(null);

    /**
     * handleToggle
     * @desc Hides the selector and opens the dialog.
     */
    const handleToggle = () => {
        setShowSelector(!showSelector)
        setIsDialogOpen(!isDialogOpen)
    }

    /**
     * handleChange
     * @desc Sets the task to the input provided by the user.
     */
    const handleChange = (event) => {
        setTask(event.target.value)
    }

    /**
     * handleSubmit
     * @desc Closes the dialog.
     */
    const handleSubmit = () => {
        setIsDialogOpen(!isDialogOpen)
    }

    /**
     * handleCancel
     * @desc Shows the selector, closes the dialog, and sets the task 
     * to null.
     */
    const handleCancel = () => {
        handleToggle()
        setTask(null)
    }

    /**
     * handleClearTask
     * @desc Shows the selector and sets the task to null.
     */
    const handleClearTask = () => {
        setShowSelector(!showSelector)
        setTask(null)
    }
  
    return ( 
        <div className="task-box">
            { showSelector &&
                <IconButton aria-label="selector-button" onClick={handleToggle} >
                    <CreateIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

            <span id="task"> { task || 'No Task Selected' } </span>

            <br/>

            { !showSelector &&
                <IconButton id="clear-button" onClick={handleClearTask} >
                    <CloseIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

            <Dialog id="dialog" open={isDialogOpen} onClose={handleCancel} >
                <DialogContent>
                    <form>
                        <TextField 
                            id="outlined-basic" 
                            label="Task name" 
                            multiline
                            rowsMax={3}
                            onChange={e => handleChange(e)}
                            margin="normal" />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button id="cancel-button" variant="contained" onClick={handleCancel} > 
                        Cancel
                    </Button>
                    { task &&
                        <Button id="confirm-button" variant="contained" onClick={handleSubmit} > 
                            Confirm 
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}
  
export default TaskSelector;
