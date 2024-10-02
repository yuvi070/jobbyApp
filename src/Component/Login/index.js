import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      history.push('/')
      this.setState({
        showError: false,
        errorMsg: '',
        username: '',
        password: '',
      })
    } else {
      const data = await response.json()
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jsCookie = Cookies.get('jwt_token')
    if (jsCookie !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="home">
          <div className="body">
            <div className="div1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className=""
              />
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="mini-div1">
                  <label className="label" htmlFor="input1">
                    USERNAME
                  </label>
                  <br />
                  <input
                    value={username}
                    id="input1"
                    placeholder="username"
                    type="text"
                    className="inputItem"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="mini-div2">
                  <label className="label" htmlFor="input2">
                    PASSWORD
                  </label>
                  <br />
                  <input
                    value={password}
                    id="input2"
                    placeholder="password"
                    type="password"
                    className="inputItem"
                    onChange={this.onChangePassword}
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              {showError && <p className="error-msg">{errorMsg}</p>}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login
