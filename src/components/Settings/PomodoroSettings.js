import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
            <Grid container spacing={1} direction="column">
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Break after Pomodoro</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={autoBreak} onChange={handleBoolChange} name='autoBreak' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Auto Start Pomodoro after Break</p>
                    </Grid>
                    <Grid item xs>
                        <Switch checked={autoFocus} onChange={handleBoolChange} name='autoFocus' />
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
                                onChange={handleValueChange}
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
                                onChange={handleValueChange}
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
                                onChange={handleValueChange}
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
                    <Grid item xs={9}>
                        <p>Pomodoros Before Long Break</p>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined">
                            <Select
                                label="pomodoro-count"
                                onChange={handleValueChange}
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
            </Grid>        
        </div>
    )
}

export default PomodoroSettings;