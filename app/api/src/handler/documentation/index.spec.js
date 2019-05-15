const assert = require('chai').assert
const createApp = require('./../../../test/app')
const request = require('supertest')
const swaggerDocumentation = require('./../../../swagger.json')
const path = '/documentation'

describe(`GET ${path}`, () => {
  it('returns with the swagger documentation for the api', () => {
    request(createApp())
      .get(path)
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, swaggerDocumentation)
      })
  })
})
