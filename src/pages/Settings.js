import React from 'react';
import HomeSettings from '../components/Settings/HomeSettings';
import PomodoroSettings from '../components/Settings/PomodoroSettings';
// import {makeStyles} from '@material-ui/core/styles';



// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     formControl: {
//         margin: theme.spacing(3),
//     },
// }));

function Settings(props) {
    return (
        <div className="Settings">
            <br></br>
            <hr></hr>
            <h2>General</h2>
            <PomodoroSettings/>
            <hr></hr>
            <h2>Home Screen Customization</h2>
            <HomeSettings/>
        </div>
    )
}

export default Settings;