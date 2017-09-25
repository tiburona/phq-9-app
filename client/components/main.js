import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { medColor } from './constants'

/**
 * COMPONENT
 *  The Main component displays the navbar and anything
 *  else common to the entire app. 
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div>
      <nav className='navbar navbar-toggleable-md navbar-light bg-faded'
        style={{ backgroundColor: medColor }}>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/' className="navbar-brand" style={{ margin: 15 }} >Home</Link>
              <Link to='/phq' style={{ margin: 15 }}>Take the PHQ-9</Link>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/' className="navbar-brand" style={{ margin: 10 }} >Home</Link>
              <Link to='/phq' style={{ margin: 15 }}>Take the PHQ-9</Link>
              <Link to='/login' style={{ margin: 15 }}>Login</Link>
              <Link to='/signup' style={{ margin: 15 }}>Sign Up</Link>
            </div>
        }
      </nav>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getSession() {
      dispatch(getSession())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


