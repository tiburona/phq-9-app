/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const authRequest = require('superagent')
const db = require('../db')
const app = require('../index')
const Phq = db.model('phq')

describe('Phq routes', () => {
  beforeEach(() => {
    return db.sync({})
  })

  var session = 'aaa123'
  var phq = {
    q1: 0, q2: 1, q3: 3, q4: 3, q5: 1,
    q6: 2, q7: 3, q8: 0, q9: 2, q10: 3, session: session
  }
  var user = { userId: 1 }

  describe('/api/phqs/', () => {

    it('POST should post a new PHQ', () => {
      return request(app)
        .post('/api/phqs')
        .send(phq)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.q9).to.be.equal(2)
          phq = res.body
        })
    })

    it('PUT should update a record with the user id', () => {
      return request(app)
        .put(`/api/phqs/${session}`)
        .send(user)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1][0]).to.be.an('object')
          expect(res.body[1][0].userId).to.be.equal(1)
        })
    })

  })
}) 
