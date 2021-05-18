import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loginAction} from "../redux/actions/authAction"
import history from './../components/common/HistoryComponent'
import {Input, Button} from "@material-ui/core"
import "./../styles/login.css"

const Login = props => {
  const [login, changeLogin] = useState("")
  const [password, changePassword] = useState("")

  const submitForm = event => {
    event.preventDefault()

    props.loginAction({
      login, password
    })
  }

  if (props.loggedIn) history.push('/me')
  return (
    <main>
      <form id="loginForm">
        <label htmlFor="login">
          <Input type="text" id="login" placeholder="Логин" onChange={e => changeLogin(e.target.value)}/>
        </label>

        <label htmlFor="password">
          <Input type="password" id="password" placeholder="Пароль" onChange={e => changePassword(e.target.value)}/>
        </label>

        <Button onClick={submitForm}>Войти</Button>
        <Link className="outside-link" to="/signup">Еще нет аккаунта? Создать</Link>
      </form>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, {loginAction})(Login)