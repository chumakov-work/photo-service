import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Header = props => {
  return (
    <header>
      <Link className="logotype" to="/">Logotype</Link>

      <h4>Интересные места в городе</h4>

      {props.loggedIn ? <Link to="/me">Профиль</Link> : <Link to="/login">Войти</Link>}
    </header>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, null)(Header)