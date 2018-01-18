import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const Header =  () => (
  <AppBar position='static' color='default'>
    <Toolbar>
      <Typography type='title' color='inherit'>
        Sloane And Hyde Token
      </Typography>
    </Toolbar>
  </AppBar>
)

export default Header;
