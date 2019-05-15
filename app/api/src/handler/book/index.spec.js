const assert = require('chai').assert
const createApp = require('./../../../test/app')
const request = require('supertest')

describe('GET /book/{id}', () => {
  it('returns 404 if book does not exist', () => {
    return request(createApp())
      .get('/book/66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D6')
      .expect(404)
  })

  it('returns a book by a given id', () => {
    return request(createApp())
      .get('/book/66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          author: 'Gene Kim',
          id: '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5',
          title:
            'The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win',
          published: false,
        })
      })
  })
})

describe('POST /book', () => {
  it('returns 200', () => {
    return request(createApp())
      .post('/book')
      .send({
        author: 'Gene Kim',
        title:
          'The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations',
        published: false,
      })
      .expect(200)
      .then(response => {
        const { author, id, title, published } = response.body
        assert.equal(author, 'Gene Kim')
        assert.match(
          id,
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
        assert.equal(
          title,
          'The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations'
        )
        assert.equal(published, false)
      })
  })

  it('returns 400 if author or title are missing', () => {
    return request(createApp())
      .post('/book')
      .send({
        title:
          'The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations',
        published: false,
      })
      .expect(400)

    return request(createApp())
      .post('/book')
      .send({
        author: 'Gene Kim',
        published: false,
      })
      .expect(400)
  })
})

describe('GET /book/{id}/publish', () => {
  it('returns 200', () => {
    return request(createApp())
      .get('/book/66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5/publish')
      .send()
      .expect(200)
      .then(response => {
        const { publishedAt } = response.body
        assert.match(
          publishedAt,
          /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
        )
      })
  })
})
