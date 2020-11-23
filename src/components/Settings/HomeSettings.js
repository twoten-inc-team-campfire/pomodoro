import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

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
            <Grid container spacing={1} direction="column">
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Pause Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={pause} onChange={handleChange} name='pause' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Fast Forward Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={fastForward} onChange={handleChange} name='fastForward' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Cancel Button</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={cancel} onChange={handleChange} name='cancel' />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item xs={9}>
                        <p>Task Selector</p>
                    </Grid>
                    <Grid item xs>
                        <Checkbox checked={taskSelection} onChange={handleChange} name='taskSelection' />
                    </Grid>
                </Grid>
            </Grid>

            {/* <FormControl component="fieldset" className={classes.formControl}>
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
            </FormControl> */}
        </div>
    )
}

export default HomeSettings;