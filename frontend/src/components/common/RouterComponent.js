import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Pages
import HomePage from "../../pages/HomePage"
import Login from "../../pages/Login"
import Signup from "../../pages/Signup"
import Profile from "../../pages/Profile"
import Admin from "../../pages/Admin"

const RouterComponent = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/signup" exact>
        <Signup />
      </Route>

      <Route path="/me" exact>
        <Profile />
      </Route>

      <Route path="/admin" exact>
        <Admin />
      </Route>
    </Switch>
  )
}

export default RouterComponent