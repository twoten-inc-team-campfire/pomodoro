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
    
    const handleCheckedChange = (event) => {
        let name = event.target.name;
        let newValue = event.target.checked;

        dispatch(SettingsActions.HANDLE_CHANGE(name, newValue));
    }

    const handleChange = (event) => {
        let name = event.target.name;
        let newValue = event.target.value;

        dispatch(SettingsActions.HANDLE_CHANGE(name, newValue));
    }

    const {autoBreak, autoFocus, focusLength, shortBreakLength,
        longBreakLength, focusCycleCount, pause, fastForward, 
        cancel, taskSelection} = settings;

    return (
        <div className="Settings">
            <Grid container spacing={1} direction="column">
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Break after Pomodoro</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={settings.autoBreak} onChange={handleCheckedChange} name='autoBreak' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Pomodoro after Break</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={settings.autoFocus} onChange={handleCheckedChange} name='autoFocus' />
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
                                onChange={handleChange}
                                value={focusLength}
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
                                onChange={handleChange}
                                value={shortBreakLength}
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
                                onChange={handleChange}
                                value={longBreakLength}
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
                                onChange={handleChange}
                                value={focusCycleCount}
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
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Pause Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox value={pause} onChange={handleChange} name='pause' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Fast Forward Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox value={fastForward} onChange={handleChange} name='fastForward' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Cancel Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox value={cancel} onChange={handleChange} name='cancel' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Task Selector</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox value={taskSelection} onChange={handleChange} name='taskSelection' />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings;