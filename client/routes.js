import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
  Main, Login, Signup, Splash,
  Phq, PhqContainer, Results, Past
} from './components'
import { me, getSession, fetchPhqs } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentWillMount() {
    this.props.loadInitialData()
    this.props.getSession()
  }

  render() {
    const { isLoggedIn, getSession } = this.props

    // The root path directs to user history or the splash
    // page depending on whether the user is logged in.
    const homeComponent = isLoggedIn ? Past : Splash

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/phq' component={PhqContainer} />
            <Route path='/results' component={Results} />
            {/* Displays Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' is a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object.
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getSession() {
      dispatch(getSession())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

