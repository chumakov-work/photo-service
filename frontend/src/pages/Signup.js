import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {signupAction} from "../redux/actions"
import history from "../components/common/HistoryComponent"
import {Input, Button} from "@material-ui/core"
import "./../styles/login.css"

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
      <form id="registerForm">
        <label htmlFor="login">
          <Input type="text" id="login" placeholder="Логин" onChange={e => changeLogin(e.target.value)}/>
        </label>

        <label htmlFor="email">
          <Input type="text" id="name" placeholder="Имя" onChange={e => changeName(e.target.value)}/>
        </label>

        <label htmlFor="password">
          <Input type="password" id="password" placeholder="Пароль" onChange={e => changePassword(e.target.value)}/>
        </label>

        <Button onClick={submitForm}>Создать</Button>
        <Link className="outside-link" to="/login">Уже есть аккаунт? Войти</Link>
      </form>
    </main>
  )
}

export default connect(null, {signupAction})(Signup)