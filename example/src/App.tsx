import React from 'react'
import {
  NavLink,
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'

import 'react-balkangraph-orgchart/dist/index.css'

import CustomTemplate from './Templates/CustomTemplate'
import MainTemplate from './Templates/MainTemplate'
import CustomConfig from './Templates/CustomConfig'

const App = () => (
  <Router>
    <header className='navigate'>
      <NavLink
        to='/default-template'
        className='link'
        activeClassName='link--active '
      >
        Default Template
      </NavLink>
      <NavLink
        to='/custom-template'
        className='link'
        activeClassName='link--active '
      >
        Custom Template
      </NavLink>
      <NavLink
        to='/custom-config'
        className='link'
        activeClassName='link--active '
      >
        Custom Config
      </NavLink>
    </header>
    <Switch>
      <div className='live-container'>
        <Route path='/default-template' component={MainTemplate} />
        <Route path='/custom-template' component={CustomTemplate} />
        <Route path='/custom-config' component={CustomConfig} />
        <Redirect to='/custom-template' from='/' />
      </div>
    </Switch>
  </Router>
)

export default App
