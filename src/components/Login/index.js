import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {nameInput: '', pinInput: '', isShowError: false, errorMessage: ''}

  onChangeUserName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props

    history.replace('/')
  }

  onSubmitFailure = errMessage => {
    this.setState({isShowError: true, errorMessage: errMessage})
  }

  onSubmitFormDetails = async event => {
    event.preventDefault()

    const {nameInput, pinInput} = this.state

    const userDetails = {
      user_id: nameInput,
      pin: pinInput,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(url, options)

    const fetchedData = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
  }

  render() {
    const {nameInput, pinInput, errorMessage, isShowError} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="form-main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
          <div className="form-description-container">
            <h1 className="login-heading">Welcome Back</h1>
            <form
              className="form-container"
              onSubmit={this.onSubmitFormDetails}
            >
              <label htmlFor="name" className="name-label">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="name"
                value={nameInput}
                placeholder="Enter User ID"
                onChange={this.onChangeUserName}
              />
              <label htmlFor="password" className="name-label">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="password"
                value={pinInput}
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            {isShowError ? (
              <p className="error-message">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
