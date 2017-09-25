import axios from 'axios'
import history from '../history'
import {putPhq, clearPhq, removeSession, getSession} from '.'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

// On login the user must be put on state, and any PHQ's
// in the database matching the session must be updated
// with the user id.
export const auth = (email, password, method, session) => 
  dispatch => 
    axios.post(`/auth/${method}`, {email, password})
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(putPhq(res.data.id, session))
        history.push('/')
      })
      .catch(error =>
        dispatch(getUser({error})))

// On logout, user and phq must be cleared off state,
// The session must be forcefully destroyed and removed
// from state, and then the new session must be fetched. 
export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        axios.get('/user')
        dispatch(removeUser())
        dispatch(clearPhq())
        dispatch(removeSession())
        history.push('/login')
      })
      .then(()=>{
        dispatch(getSession())
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
