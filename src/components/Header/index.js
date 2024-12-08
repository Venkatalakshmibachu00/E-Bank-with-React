import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="header-bg-container">
      <nav className="nav-background">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button onClick={onLogout} className="button-logout" type="button">
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
