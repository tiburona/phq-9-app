import axios from 'axios'
import history from '../history'
import store from '.'

/**
 * ACTION TYPES
 */
const GET_SESSION = 'GET_SESSION'

/**
 * INITIAL STATE
 */
const initSession = {}

/**
 * ACTION CREATORS
 */
const receiveSession = session => ({type: GET_SESSION, session})

/**
 * ASYNC ACTION CREATORS
 */
export const getSession = (session) =>
  dispatch => 
    axios.get('/api/session')
      .then(res => 
        dispatch(receiveSession(res.data.session)))
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = initSession, action) {
  switch (action.type) {
    case GET_SESSION:
      return action.session
    default:
      return state
  }
}