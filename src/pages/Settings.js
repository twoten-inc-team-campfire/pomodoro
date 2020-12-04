import React from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import {useSettingsGlobalState} from '../GlobalState/GlobalStateHooks';
import { withStyles } from '@material-ui/core/styles'

/**
 * Settings
 * @desc The page that displays the UI components for settings and sends change
 * events to the Global context.
 */

let textPrimary = "#000000";
let textSecondary = "#838383";
let colorPrimary = "#086788";
let colorSecondary = "#07a0c3";
  


const BlueSwitch = withStyles({
    switchBase: {
        color: textSecondary,
        '&$checked': {
            color: colorPrimary,
        },
        '&$checked + $track': {
            backgroundColor: colorSecondary,
        },
    },
    checked: {},
    track: {},
})(Switch);

const BlueCheckbox = withStyles({
    root: {
        color: colorSecondary,
        '&$checked': {
            color: colorPrimary,
        },
    },
    checked: {},
})(Checkbox);

function Settings(props) {

    const { settings, dispatch, SettingsActions } = useSettingsGlobalState()
    
    /**
     * Receives user events from Checkbox and Switch components, and dispatches
     * setting changes to the Global state.
     * @param {Object} event - The event generated by the HTML element
     */
    const changeCheckBox = (event) => {
        let name = event.target.name;
        let newValue = event.target.checked;

    const {autoBreak, autoFocus, focusLength, shortBreakLength,
        longBreakLength, focusCycleCount, pause, fastForward, 
        cancel, taskSelection} = settings;

    /**
     * Receives user events from Select components, and dispatches
     * setting changes to the Global state.
     * @param {Object} event - The event generated by the HTML element
     */
    const changeNumberValue = (event) => {
        let name = event.target.name;
        let newValue = event.target.value;

        dispatch(SettingsActions.HANDLE_CHANGE(name, newValue));
    }

    return (
        <div className="Settings">
            <Grid container spacing={1} direction="column">
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Break after Pomodoro</p>
                    </Grid>
                    <Grid item xs>
                        <BlueSwitch checked={settings.autoBreak} onChange={changeCheckBox}
                            name='autoBreak' inputProps={{ 'aria-label': 'Auto Break Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Pomodoro after Break</p>
                    </Grid>
                    <Grid item xs>
                        <BlueSwitch checked={settings.autoFocus} onChange={changeCheckBox} 
                            name='autoFocus' inputProps={{ 'aria-label': 'Auto Focus Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <p>Pomodoro Length</p>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined">
                            <Select
                                label="pomodoro-length"
                                onChange={changeNumberValue}
                                value={settings.focusLength}
                                name="focusLength"
                                inputProps={{'aria-label': 'Focus Length Selector'}}
                                data-testid="focusLengthSelector"
                            >
                                <MenuItem value={15} data-testid="focusLength15">15:00</MenuItem>
                                <MenuItem value={20} data-testid="focusLength20">20:00</MenuItem>
                                <MenuItem value={25} data-testid="focusLength25">25:00</MenuItem>
                                <MenuItem value={30} data-testid="focusLength30">30:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <p>Short Break Length</p>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined">
                            <Select
                                label="short-break-length"
                                onChange={changeNumberValue}
                                value={settings.shortBreakLength}
                                inputProps={{'aria-label': 'Short Break Length Selector'}}
                                name="shortBreakLength"
                            >
                                <MenuItem value={4} data-testid="shortLength4">4:00</MenuItem>
                                <MenuItem value={5} data-testid="shortLength5">5:00</MenuItem>
                                <MenuItem value={7} data-testid="shortLength7">7:00</MenuItem>
                                <MenuItem value={10} data-testid="shortLength10">10:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>   
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <p>Long Break Length</p>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined">
                            <Select
                                label="long-break-length"
                                onChange={changeNumberValue}
                                value={settings.longBreakLength}
                                inputProps={{'aria-label': 'Long Break Length Selector'}}
                                name="longBreakLength"
                            >
                                <MenuItem value={15} data-testid="longLength15">15:00</MenuItem>
                                <MenuItem value={20} data-testid="longLength20">20:00</MenuItem>
                                <MenuItem value={25} data-testid="longLength25">25:00</MenuItem>
                                <MenuItem value={30} data-testid="longLength30">30:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={9}>
                        <p>Pomodoros Before Long Break</p>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined">
                            <Select
                                label="pomodoro-count"
                                onChange={changeNumberValue}
                                value={settings.focusCycleCount}
                                inputProps={{'aria-label': 'Pomodoro Count Selector'}}
                                name="focusCycleCount"
                            >
                                <MenuItem value={1} data-testid="pomocount1">1</MenuItem>
                                <MenuItem value={2} data-testid="pomocount2">2</MenuItem>
                                <MenuItem value={3} data-testid="pomocount3">3</MenuItem>
                                <MenuItem value={4} data-testid="pomocount4">4</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Pause Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.pause} onChange={changeCheckBox} 
                            name='pause' inputProps={{ 'aria-label': 'Pause Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Fast Forward Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.fastForward} onChange={changeCheckBox}
                            name='fastForward' inputProps={{ 'aria-label': 'Fast Forward Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Cancel Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.cancel} onChange={changeCheckBox} 
                            name='cancel' inputProps={{ 'aria-label': 'Cancel Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Task Selector</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.taskSelection} onChange={changeCheckBox} 
                            name='taskSelection' inputProps={{ 'aria-label': 'Task Selector Checkbox'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings;