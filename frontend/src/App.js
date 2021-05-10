import React, {useEffect} from 'react'
import {Router} from 'react-router-dom'
import RouterComponent from "./components/common/RouterComponent"
import Header from "./components/layout/Header"
import history from './components/common/HistoryComponent'
import {connect} from "react-redux";
import {isLoggedIn, userLocationAction} from "./redux/actions";

const App = props => {
  useEffect(() => {
    props.isLoggedIn()
    props.userLocationAction()
  })

  return (
    <Router history={history}>
      <Header/>
      <RouterComponent/>
    </Router>
  );
}

export default connect(null, {isLoggedIn, userLocationAction})(App)