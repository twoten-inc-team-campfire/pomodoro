import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CloseIcon from '@material-ui/icons/Close';
import { useTimerGlobalState } from '../GlobalState/GlobalStateHooks';

const useStyles = makeStyles({
  root: {
    width: 500,
    "is-stuckToBottom": true
  },
});

const BottomNavBar = ({value, setValue}) => {
  const classes = useStyles();
  const { timer } = useTimerGlobalState();
  const disableButton = timer.isTimerRunning

  return (
      <BottomNavigation
          aria-label="buttom-nav-bar"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
      >
            <BottomNavigationAction 
                aria-label="timer-button" 
                label="Timer" 
                icon={<TimerIcon />} 
            />
            <BottomNavigationAction 
                aria-label="settings-button" 
                disabled={disableButton} 
                label="Settings" 
                icon={disableButton ? <CloseIcon/> : <SettingsIcon />} 
            />
            <BottomNavigationAction 
                aria-label="statistics-button" 
                disabled={disableButton}
                label="Statistics" 
                icon={disableButton ? <CloseIcon/> : <EqualizerIcon />} 
            />
      </BottomNavigation>
  )
}

export default BottomNavBar