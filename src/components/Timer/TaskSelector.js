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

<<<<<<< HEAD
            <span id="taskName" data-testid="taskDescription"> { task || 'No Task Selected' } </span>
=======
            <span id="task"> { task || 'No Task Selected' } </span>
>>>>>>> Cleaned up Task Selector logic

            <br/>

            { !showSelector &&
<<<<<<< HEAD
                <IconButton id="clear-button" data-testid="clearButton" onClick={handleClearTask} >
=======
                <IconButton id="clear-button" onClick={handleClearTask} >
>>>>>>> Cleaned up Task Selector logic
                    <CloseIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

<<<<<<< HEAD
            <Dialog id="dialog" open={isDialogOpen} >
=======
            <Dialog id="dialog" open={isDialogOpen} onClose={handleCancel} >
>>>>>>> Cleaned up Task Selector logic
                <DialogContent>
                    <form>
                        <TextField 
                            id="outlined-basic" 
                            label="Task name" 
                            multiline
                            rowsMax={3}
                            onChange={e => handleChange(e)}
<<<<<<< HEAD
                            data-testid="taskTextArea"
=======
>>>>>>> Cleaned up Task Selector logic
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
