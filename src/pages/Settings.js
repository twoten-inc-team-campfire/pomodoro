import React from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import {useSettingsGlobalState} from '../GlobalState/GlobalStateHooks';


function Settings(props) {

    const { settings, dispatch, SettingsActions } = useSettingsGlobalState()
    
    const handleBooleanCheckedChange = (event) => {
        let name = event.target.name;
        let newValue = event.target.checked;

        dispatch(SettingsActions.HANDLE_CHANGE(name, newValue));
    }

    const handleNumberValueChange = (event) => {
        let name = event.target.name;
        let newValue = event.target.value;

        dispatch(SettingsActions.HANDLE_CHANGE(name, newValue));
    }

    return (
        <div className="Settings">
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <h4>General Settings</h4>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Break after Pomodoro</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={settings.autoBreak} onChange={handleBooleanCheckedChange}
                            name='autoBreak' inputProps={{ 'aria-label': 'Auto Break Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Pomodoro after Break</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={settings.autoFocus} onChange={handleBooleanCheckedChange} 
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
                                onChange={handleNumberValueChange}
                                value={settings.focusLength}
                                name="focusLength"
                            >
                                <MenuItem value={15}>15:00</MenuItem>
                                <MenuItem value={20}>20:00</MenuItem>
                                <MenuItem value={25}>25:00</MenuItem>
                                <MenuItem value={30}>30:00</MenuItem>
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
                                onChange={handleNumberValueChange}
                                value={settings.shortBreakLength}
                                name="shortBreakLength"
                            >
                                <MenuItem value={4}>4:00</MenuItem>
                                <MenuItem value={5}>5:00</MenuItem>
                                <MenuItem value={7}>7:00</MenuItem>
                                <MenuItem value={10}>10:00</MenuItem>
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
                                onChange={handleNumberValueChange}
                                value={settings.longBreakLength}
                                name="longBreakLength"
                            >
                                <MenuItem value={15}>15:00</MenuItem>
                                <MenuItem value={20}>20:00</MenuItem>
                                <MenuItem value={25}>25:00</MenuItem>
                                <MenuItem value={30}>30:00</MenuItem>
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
                                onChange={handleNumberValueChange}
                                value={settings.focusCycleCount}
                                name="focusCycleCount"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
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
                        <Checkbox checked={settings.pause} onChange={handleBooleanCheckedChange} 
                            name='pause' inputProps={{ 'aria-label': 'Pause Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Fast Forward Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={settings.fastForward} onChange={handleBooleanCheckedChange}
                            name='fastForward' inputProps={{ 'aria-label': 'Fast Forward Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Cancel Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={settings.cancel} onChange={handleBooleanCheckedChange} 
                            name='cancel' inputProps={{ 'aria-label': 'Cancel Button Checkbox'}}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Task Selector</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={settings.taskSelection} onChange={handleBooleanCheckedChange} 
                            name='taskSelection' inputProps={{ 'aria-label': 'Task Selector Checkbox'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings;