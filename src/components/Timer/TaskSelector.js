import React, { useState } from 'react';
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
 * Callback to pass the newly selected task to the parent.
 * @callback onTaskChange
 * @param {string} task - The new task being passed to the parent
 * @memberOf TaskSelector
 */
/**
 * TaskSelector
 * @desc Component that allows users to enter a task for the current
 * pomodoro session.
 */
function TaskSelector({onTaskChange}) {
    const [showSelector, setShowSelector] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [task, setTask] = useState(null);

    const setTaskState = (task) => {
        onTaskChange(task);
        setTask(task);
    }

    /**
     * handleToggle
     * @desc Hides the selector and opens the dialog.
     */
    const handleToggle = () => {
        setShowSelector(!showSelector);
        setIsDialogOpen(!isDialogOpen);
    }

    /**
     * handleChange
     * @desc Sets the task to the input provided by the user.
     */
    const handleChange = (event) => {
        setTaskState(event.target.value);
    }

    /**
     * handleSubmit
     * @desc Closes the dialog.
     */
    const handleSubmit = () => {
        setIsDialogOpen(!isDialogOpen);
    }

    /**
     * handleCancel
     * @desc Shows the selector, closes the dialog, and sets the task 
     * to null.
     */
    const handleCancel = () => {
        handleToggle();
        setTaskState(null);
    }

    /**
     * handleClearTask
     * @desc Shows the selector and sets the task to null.
     */
    const handleClearTask = () => {
        setShowSelector(!showSelector);
        setTaskState(null);
    }
  
    return ( 
        <div className="task-box">
            { showSelector &&
                <IconButton aria-label="selector-button" onClick={handleToggle} >
                    <CreateIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

            <span id="taskName" data-testid="taskDescription"> { task || 'No Task Selected' } </span>

            <br/>

            { !showSelector &&
                <IconButton id="clear-button" data-testid="clearButton" onClick={handleClearTask} >
                    <CloseIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

            <Dialog id="dialog" open={isDialogOpen} >
                <DialogContent>
                    <form>
                        <TextField 
                            id="outlined-basic" 
                            label="Task name" 
                            multiline
                            rowsMax={3}
                            onChange={e => handleChange(e)}
                            data-testid="taskTextArea"
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