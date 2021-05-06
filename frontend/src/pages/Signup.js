import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signupAction} from "../redux/actions/authAction";
import history from "../components/common/HistoryComponent";

const Signup = props => {
  const [login, changeLogin] = useState("")
  const [name, changeName] = useState("")
  const [password, changePassword] = useState("")

  const submitForm = event => {
    event.preventDefault()

    props.signupAction({
      login, name, password
    })
  }

  if (props.loggedIn) history.push('/')
  return (
    <main>
      <form>
        <label htmlFor="login">
          <input type="text" id="login" placeholder="login" onChange={e => changeLogin(e.target.value)}/>
        </label>

        <label htmlFor="email">
          <input type="text" id="name" placeholder="name" onChange={e => changeName(e.target.value)}/>
        </label>

        <label htmlFor="password">
          <input type="password" id="password" placeholder="password" onChange={e => changePassword(e.target.value)}/>
        </label>

        <input type="submit" value="Создать" onClick={submitForm}/>
      </form>

      <Link to="/login">Уже есть аккаунт? Войти</Link>
    </main>
  )
}

export default connect(null, {signupAction})(Signup)