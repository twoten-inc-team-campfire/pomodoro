import React, { useState, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownCircle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


function TaskSelector() {
    const [showSelector, setShowSelector] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [task, setTask] = useState(null);
  
    const handleToggle = () => {
        setShowSelector(!showSelector)
        setIsDialogOpen(!isDialogOpen)
    }

    const handleChange = (event) => {
        setTask(event.target.value)
    }

    const handleSubmit = () => {
        setIsDialogOpen(!isDialogOpen)
    }

    const handleCancel = () => {
        handleToggle();
        setTask(null)
    }

    const handleTaskClear = () => {
        setShowSelector(!showSelector)
        setTask(null)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
        handleTaskClear();
    }
  
    return ( 
        <Fragment>
            { showSelector &&
                <IconButton aria-label="selector-button" onClick={handleToggle} >
                    <ArrowDropDownIcon style={{ fontSize: '35px', color: '#015384' }} />
                </IconButton>
            }

            { task || 'No Task Selected' }

            <br></br>

            { !isDialogOpen && task &&
                <span>
                    <IconButton aria-label="complete-button" onClick={handleTaskClear} >
                        <CheckIcon style={{ fontSize: '35px', color: '#015384' }} />
                    </IconButton>
                    <IconButton aria-label="cancel-button" onClick={handleTaskClear} >
                        <CloseIcon style={{ fontSize: '35px', color: '#015384' }} />
                    </IconButton>
                </span>
            }

            <Dialog open={isDialogOpen} onClose={closeDialog} >
                <DialogContent>
                    <form>
                        <TextField 
                            id="outlined-basic" 
                            label="Task name" 
                            multiline
                            rowsMax={4}
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
        </Fragment>
    )
}
  
export default TaskSelector;
