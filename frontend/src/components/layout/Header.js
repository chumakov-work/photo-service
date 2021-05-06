import React from 'react'
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link className="logotype" to="/">Logotype</Link>

      <h4>Интересные места в городе</h4>

      <Link to="/login">Войти</Link>
    </header>
  )
}

export default Header