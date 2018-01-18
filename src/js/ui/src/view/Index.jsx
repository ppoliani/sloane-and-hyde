import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {MuiThemeProvider, createMuiTheme, withTheme} from 'material-ui/styles'
import '../services/fn'
import RootContainer from './RootContainer'
import configureStore from '../data'
import './index.html'
import './app.scss'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});


const bootstrap = Component => {
  render(
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <Component store={configureStore()}/>
      </AppContainer>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

bootstrap(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainer', () => {
    bootstrap(RootContainer);
  });
}
