import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import NativeSelect from '@material-ui/core/NativeSelect';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function PomodoroSettings(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        autoBreak: true,
        autoFocus: true,
        focusLength: 25,
        shortBreakLength: 5,
        longBreakLength: 20,
        focusCycleCount: 4,
    });

    const handleBoolChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked });
    };

    const handleValueChange = (event) => {
        setState({...state, [event.target.name]: event.target.value });
    };

    const {autoBreak, autoFocus, focusLength, shortBreakLength,
        longBreakLength, focusCycleCount} = state;


    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="pomodoro-settings">Pomodoro Settings</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={autoBreak} onChange={handleBoolChange} name='autoBreak' />}
                        label="Auto Start Break after Pomodoro" 
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Switch checked={autoFocus} onChange={handleBoolChange} name='autoFocus' />}
                        label="Auto Start Pomodoro after Break" 
                        labelPlacement="start"
                    />
                    <NativeSelect
                        value={focusLength}
                        onChange={handleValueChange}
                        name="focusLength"
                    >
                        <option value={15}>15:00</option>
                        <option value={20}>20:00</option>
                        <option value={25}>25:00</option>
                        <option value={30}>30:00</option>
                    </NativeSelect>
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default PomodoroSettings;