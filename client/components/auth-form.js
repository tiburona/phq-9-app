import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, putPhq} from '../store'
import {buttonStyle} from './constants'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error, session} = props

  return (
    <div className='container' style={{marginTop: 40}}>
      <form onSubmit={(evt)=>{handleSubmit(evt, session)}} name={name} className={'form-group'}>
        <div>
          <label htmlFor='email'><small>Email</small></label>
          <input className='form-control' name='email' type='text' />
        </div>
        <div>
          <label htmlFor='password'><small>Password</small></label>
          <input className='form-control' name='password' type='password' />
        </div>
        <div>
          <button type='submit' className='btn' style={buttonStyle}>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    session: state.session
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    session: state.session
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, session) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, session))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
