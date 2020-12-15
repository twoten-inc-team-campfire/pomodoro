import React from 'react';
import Grid from '@material-ui/core/Grid';

const AppLayout = ({PageToRender, ButtomNavBar}) => {
    return (
      <Grid 
        direction="column"
        container
        alignItems="center"
      >
        <Grid 
            style={{
              paddingBottom: 80,
            }}
            item
            container
            justify="center"
            alignItems="center"
        >
            {PageToRender}
        </Grid>
        <Grid 
            className="bottom-navbar"
            item   
            container
            justify="center"
            alignItems="center"
        >
            {ButtomNavBar}
        </Grid>
      </Grid>
    )
}

export default AppLayout