import axios from 'axios'
import history from '../history'
import store from '.'

/**
 * ACTION TYPES
 */
const ADD_PHQ = 'ADD_PHQ'
const SCORE_PHQ = 'SCORE_PHQ'
const UPDATE_USER = 'UPDATE_USER'
const GET_PHQS = 'GET_PHQ'
const CLEAR_PHQ = 'CLEAR_PHQ'

/**
 * INITIAL STATE
 */
const defaultPhq = {data: {}, history: [], userId:[]}

/**
 * ACTION CREATORS
 */
const addPhq = phq => ({type: ADD_PHQ, phq})
export const scorePhq = score => ({type: SCORE_PHQ, score})
const updateUser = user => ({type: UPDATE_USER, user})
const receivePhqs = phqs => ({type: GET_PHQS, phqs})
export const clearPhq = () => 
  ({type: CLEAR_PHQ, history:[], data:{}, userId: [], score: undefined})

/**
 * ASYNC ACTION CREATORS
 */

export const fetchPhqs = (userId) => 
dispatch => 
  axios.get(`/api/phqs/${userId}`)
    .then(res => 
      dispatch(receivePhqs(res.data)))
    .catch(err => console.log(err))

export const postPhq = (phq) =>
  dispatch => 
    axios.post('/api/phqs', phq)
      .then(res => 
        dispatch(addPhq(res.data)))
      .catch(err => console.log(err))

export const putPhq = (userId, session) => 
  dispatch => 
    axios.put(`/api/phqs/${session}`, {userId})
      .then(res => 
        dispatch(updateUser(res.data)))
      .catch(err => console.log(err))
  
/**
 * REDUCER
 */
export default function (state = defaultPhq, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PHQS:
      newState.history = action.phqs
    case ADD_PHQ:
      newState.data = action.phq
      return newState
    case SCORE_PHQ:
      newState.score = action.score
      return newState
    case UPDATE_USER:
      newState.userId = action.user
      return newState
    case CLEAR_PHQ:
      newState.history = action.history
      newState.data = action.data
      newState.userId = action.userId
      newState.score = action.score
      return newState
    default:
      return state
  }
}
