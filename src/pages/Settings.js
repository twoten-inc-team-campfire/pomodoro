import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import {useSettingsGlobalState} from '../GlobalState/GlobalStateHooks';
import { withStyles } from '@material-ui/core/styles'
import {saveUserSettings} from '../services/DefaultDataService.js'
import { UserSettings } from '../classes/settings/UserSettings';


//let textPrimary = "#000000";
let textSecondary = "#838383";
let colorPrimary = "#086788";
let colorSecondary = "#07a0c3";
  

/**
 * BlueSwitch
 * @desc This is a custom Material UI switch that uses our color scheme.
 */
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

/**
 * BlueCheckBox
 * @desc This is a custom Material UI checkbox that uses our color scheme.
 */
const BlueCheckbox = withStyles({
    root: {
        color: colorSecondary,
        '&$checked': {
            color: colorPrimary,
        },
    },
    checked: {},
})(Checkbox);

/**
 * Settings
 * @desc The page that displays the UI components for the User settings 
 * and relays user requests to the Global context for other components 
 * to use. 
 */
function Settings(props) {

    const { settings, dispatch, SettingsActions } = useSettingsGlobalState()
    
    /**
     * ChangeCheckBox
     * @desc Receives user events from Checkbox and Switch components, and dispatches
     * setting changes to the Global state to be immediately visible to other 
     * components in the app. 
     * @param {Object} event - The event generated by the HTML element
     */
    const changeCheckBox = (event) => {
        let name = event.target.name;
        let newValue = event.target.checked;

        dispatch(SettingsActions.CHANGE_SINGLE_SETTING(name, newValue));
    }

    /**
     * ChangeNumberValue
     * @desc Receives user events from Select components, and dispatches
     * setting changes to the Global state to be immediately visible to other 
     * components in the app.
     * @param {Object} event - The event generated by the HTML element
     */
    const changeNumberValue = (event) => {
        let name = event.target.name;
        let newValue = event.target.value;

        dispatch(SettingsActions.CHANGE_SINGLE_SETTING(name, newValue));
    }

    // The following useEffect only runs on mount and unmount because
    // we don't need to make a call to the database on each UI change.
    // We wait until the Settings page unmounts before sending the most
    // up to date settings to the database. 
    useEffect(() => {
        async function callSaveUserSettings() {
            try {
                const settingsToSave = new UserSettings(
                    settings.pomodoroLength,
                    settings.shortBreakLength,
                    settings.longBreakLength,
                    settings.numPomodorosInCycle,
                    settings.autoStartBreaks,
                    settings.autoStartPomodoros,
                    settings.displayPauseButton,
                    settings.displayCancelButton,
                    settings.displayFastForwardButton,
                    settings.displayTaskSelector
                )
                saveUserSettings(settingsToSave);
            } catch (error) {
                throw new Error(error);
            }
        }

        callSaveUserSettings();
        // The seconds parameter is the dependency array. Every time 
        // there is a change to settings, the useEffect hook will 
        // trigger the async call back to update the database.
    }, [settings])

    return (
        <div className="Settings" aria-label="settings-page">
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <h4>General Settings</h4>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Break after Pomodoro</p>
                    </Grid>
                    <Grid item xs>
                        <BlueSwitch checked={settings.autoStartBreaks} onChange={changeCheckBox}
                            name='autoStartBreaks' inputProps={{ 'aria-label': 'Auto Break Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Pomodoro after Break</p>
                    </Grid>
                    <Grid item xs>
                        <BlueSwitch checked={settings.autoStartPomodoros} onChange={changeCheckBox} 
                            name='autoStartPomodoros' inputProps={{ 'aria-label': 'Auto Focus Checkbox'}}
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
                                value={settings.pomodoroLength}
                                name="pomodoroLength"
                                inputProps={{'aria-label': 'Pomodoro Length Selector'}}
                                data-testid="pomodoroLengthSelector"
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
                    <Grid item xs={8}>
                        <p>Pomodoros Before Long Break</p>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined">
                            <Select
                                label="pomodoro-count"
                                onChange={changeNumberValue}
                                value={settings.numPomodorosInCycle}
                                inputProps={{'aria-label': 'Pomodoro Count Selector'}}
                                name="numPomodorosInCycle"
                            >
                                <MenuItem value={1} data-testid="pomocount1">1</MenuItem>
                                <MenuItem value={2} data-testid="pomocount2">2</MenuItem>
                                <MenuItem value={3} data-testid="pomocount3">3</MenuItem>
                                <MenuItem value={4} data-testid="pomocount4">4</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item>
                    <hr></hr>
                    <h4>Home Page Settings</h4>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Pause Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.displayPauseButton} onChange={changeCheckBox} 
                            name='displayPauseButton' inputProps={{ 'aria-label': 'Pause Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Fast Forward Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.displayFastForwardButton} onChange={changeCheckBox}
                            name='displayFastForwardButton' inputProps={{ 'aria-label': 'Fast Forward Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Cancel Button</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.displayCancelButton} onChange={changeCheckBox} 
                            name='displayCancelButton' inputProps={{ 'aria-label': 'Cancel Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Task Selector</p>
                    </Grid>
                    <Grid item xs>
                        <BlueCheckbox checked={settings.displayTaskSelector} onChange={changeCheckBox} 
                            name='displayTaskSelector' inputProps={{ 'aria-label': 'Task Selector Checkbox'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings;