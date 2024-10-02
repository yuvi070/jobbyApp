import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutFunction = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.push('/login')
  }
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <div className="header-div">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <button type="button" onClick={logoutFunction}>
        Log out
      </button>
    </div>
  )
}

export default withRouter(Header)
