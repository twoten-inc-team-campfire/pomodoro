import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function HomeSettings(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        pause: true,
        fastForward: true,
        cancel: true,
        taskSelection: true,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked });
    };

    const {pause, fastForward, cancel, taskSelection} = state;


    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="home-settings">Home Screen Customization</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={pause} onChange={handleChange} name='pause' />}
                        label="Pause Button" 
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={fastForward} onChange={handleChange} name='fastForward' />}
                        label="Fast Forward Button" 
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={cancel} onChange={handleChange} name='cancel' />}
                        label="Cancel Button" 
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={taskSelection} onChange={handleChange} name='taskSelection' />}
                        label="Task Selector" 
                        labelPlacement="start"
                    />
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default HomeSettings;