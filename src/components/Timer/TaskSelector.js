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
        <Fragment>
            <div className="task-box">
                { showSelector &&
                    <IconButton aria-label="selector-button" onClick={handleToggle} >
                        <CreateIcon style={{ fontSize: '35px', color: '#015384' }} />
                    </IconButton>
                }

            { task || 'No Task Selected' }

            <br></br>

                { !isDialogOpen && task &&
                    <IconButton aria-label="cancel-button" onClick={handleClearTask} >
                        <CloseIcon style={{ fontSize: '35px', color: '#015384' }} />
                    </IconButton>
                }

            <Dialog open={isDialogOpen} onClose={handleCancel} >
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
                    <Button variant="contained" onClick={handleCancel} > 
                        Cancel
                    </Button>
                    { task &&
                        <Button variant="contained" onClick={handleSubmit} > 
                            Confirm 
                        </Button>
                    }
                </DialogActions>
            </Dialog>
            </div>
        </Fragment>
    )
}
  
export default TaskSelector;
