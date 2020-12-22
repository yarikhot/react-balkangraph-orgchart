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
import { alias, getAliasRoute, routes } from './helpers/routes'

const App = () => (
  <Router>
    <header className='navigate'>
      <NavLink
        to={getAliasRoute(routes.defaultTemplate)}
        className='link'
        activeClassName='link--active '
      >
        Default Template
      </NavLink>
      <NavLink
        to={getAliasRoute(routes.customTemplate)}
        className='link'
        activeClassName='link--active '
      >
        Custom Template
      </NavLink>
      <NavLink
        to={getAliasRoute(routes.customConfig)}
        className='link'
        activeClassName='link--active '
      >
        Custom Config
      </NavLink>
    </header>
    <Switch>
      <div className='live-container'>
        <Route
          path={getAliasRoute(routes.defaultTemplate)}
          component={MainTemplate}
        />
        <Route
          path={getAliasRoute(routes.customTemplate)}
          component={CustomTemplate}
        />
        <Route
          path={getAliasRoute(routes.customConfig)}
          component={CustomConfig}
        />
        <Redirect to={getAliasRoute(routes.defaultTemplate)} from={'/'} />
        <Redirect to={getAliasRoute(routes.defaultTemplate)} from={alias} />
      </div>
    </Switch>
  </Router>
)

export default App
