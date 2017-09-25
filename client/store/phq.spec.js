/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { postPhq } from './phq'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const mockAxios = new MockAdapter(axios)
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store

  const initialState = { phq: { data: {}, history: [] } }

  var session = 'aaa123'
  var phq = {
    q1: 0, q2: 1, q3: 3, q4: 3, q5: 1,
    q6: 2, q7: 3, q8: 0, q9: 2, q10: 3, session: session
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('postPhq', () => {
    it('eventually dispatches the ADD PHQ action', () => {
      mockAxios.onPost('/api/phqs', phq).reply(201)
      return store.dispatch(postPhq(phq))
        .then(() => {
          expect(actions[0].type).to.be.equal('ADD_PHQ')
          expect(actions[0].phq).to.be.deep.equal(phq)
        })
    })
  })

})