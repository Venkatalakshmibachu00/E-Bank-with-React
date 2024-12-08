import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  successView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = `https://apis.ccbp.in/ebank/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successView(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  changeUserId = event => {
    this.setState({userId: event.target.value})
  }

  changePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {userId, pin, showSubmitError, errorMsg} = this.state

    return (
      <div className="bg-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-img"
          />
          <div className="form-container">
            <form onSubmit={this.submitForm}>
              <h1 className="welcome-back">Welcome Back!</h1>
              <label htmlFor="userId" className="form-label">
                User Id
              </label>
              <input
                type="text"
                className="form-input"
                id="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.changeUserId}
              />
              <label htmlFor="userPin" className="form-label">
                PIN
              </label>
              <input
                type="password"
                className="form-input"
                id="userPin"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.changePin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
