import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loginAction} from "../redux/actions/authAction"
import history from './../components/common/HistoryComponent'

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
      <form>
        <label htmlFor="login">
          <input type="text" id="login" placeholder="login" onChange={e => changeLogin(e.target.value)}/>
        </label>

        <label htmlFor="password">
          <input type="text" id="login" placeholder="password" onChange={e => changePassword(e.target.value)}/>
        </label>

        <input type="submit" value="Войти" onClick={submitForm}/>
      </form>

      <Link to="/signup">Еще нет аккаунта? Создать</Link>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, {loginAction})(Login)