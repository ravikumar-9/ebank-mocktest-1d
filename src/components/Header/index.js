import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  console.log(props)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    console.log(history)
    history.replace('/ebank/login')
  }

  return (
    <div className="header-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
