const assert = require('chai').assert
const createApp = require('./../../../test/app')
const request = require('supertest')

describe('GET /status', () => {
  it('returns with status: ok', () => {
    request(createApp())
      .get('/status')
      .expect(200)
      .expect('Access-Control-Allow-Origin', '*')
      .expect(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      .then(response => {
        assert.equal(response.body.status, 'ok')
      })
  })
})
