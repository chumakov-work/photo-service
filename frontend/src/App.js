import React, {useEffect} from 'react'
import {Router} from 'react-router-dom'
import RouterComponent from "./components/common/RouterComponent"
import Header from "./components/layout/Header"
import history from './components/common/HistoryComponent'
import {connect} from "react-redux";
import {isLoggedIn} from "./redux/actions/authAction";

const App = props => {
  useEffect(() => {
    props.isLoggedIn()
  })

  return (
      <Router history={history}>
        <Header />
        <RouterComponent />
      </Router>
  );
}

export default connect(null, {isLoggedIn})(App)