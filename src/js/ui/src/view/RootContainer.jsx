import {Provider} from 'react-redux'
import React, {Component} from 'react'
import Router from './core/Router'

const Root = ({store}) => (
  <Provider store={store}>
    <Router />
  </Provider>
)

export default Root;
