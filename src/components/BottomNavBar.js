import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const BottomNavBar = ({value, setValue}) => {
  const classes = useStyles();
  return (
      <BottomNavigation
          className="is-stuckToBottom"
          aria-label="buttom-nav-bar"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
      >
            <BottomNavigationAction aria-label="timer-button" label="Timer" icon={<TimerIcon />} />
            <BottomNavigationAction aria-label="settings-button" label="Settings" icon={<SettingsIcon />} />
            <BottomNavigationAction aria-label="summary-button" label="Summary" icon={<EqualizerIcon />} />
      </BottomNavigation>
  )
}

export default BottomNavBar