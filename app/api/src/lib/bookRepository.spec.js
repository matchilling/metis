const assert = require('chai').assert
const BookRepository = require('./bookRepository')
const {
  EntityValidationError,
  ResourceNotFoundError,
  UnprocessableEntityError,
} = require('./error')
const sinon = require('sinon')

describe('BookRepository', () => {
  let bookRepository

  beforeEach(() => {
    bookRepository = new BookRepository()
  })

  describe('#fetch', () => {
    it('returns a book if it does exist', async () => {
      const book = await bookRepository.fetch(
        '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5'
      )
      assert.deepEqual(book, {
        author: 'Gene Kim',
        id: '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5',
        title:
          'The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win',
        published: false,
      })
    })

    it('throws a "ResourceNotFoundError" if book does exist', async () => {
      try {
        await bookRepository.fetch('66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D6')
      } catch (error) {
        assert.instanceOf(error, ResourceNotFoundError)
        assert.deepEqual(
          error.message,
          'Book with id "66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D6" does not exist'
        )
      }
    })
  })

  describe('#publish', () => {
    const book = {
      author: 'Gene Kim',
      id: '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5',
      title:
        'The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win',
      published: false,
    }

    let bookRepository
    beforeEach(() => {
      bookRepository = new BookRepository()
    })

    it('publishes a book', async () => {
      const stubFetch = sinon.stub(bookRepository, 'fetch').returns(book)
      const stubSave = sinon
        .stub(bookRepository, 'save')
        .returns('66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5')

      const { publishedAt } = await bookRepository.publish(
        '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5'
      )

      sinon.assert.calledWith(stubFetch, '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5')
      sinon.assert.calledWith(stubSave, {
        author: 'Gene Kim',
        id: '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5',
        published: true,
        title:
          'The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win',
      })

      assert.match(
        publishedAt,
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
      )
    })

    it('throws an error if book has already been published', async () => {
      const stubSave = sinon.spy(bookRepository, 'save')
      const stubFetch = sinon.stub(bookRepository, 'fetch').returns({
        ...book,
        published: true,
      })

      try {
        await bookRepository.publish('66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5')
      } catch (error) {
        assert.instanceOf(error, UnprocessableEntityError)
        assert.deepEqual(error.message, 'Book has already been published')
      }

      assert.isTrue(stubSave.notCalled)
      sinon.assert.calledWith(stubFetch, '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5')
    })
  })

  describe('#save', () => {
    it('stores a book', async () => {
      const data = {
        author: 'Gene Kim',
        title:
          'The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations',
        published: false,
      }

      const { id } = await bookRepository.save(data)
      assert.match(
        id,
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    })

    it('throws an error if book author is missing', async () => {
      try {
        await bookRepository.save({})
      } catch (error) {
        assert.instanceOf(error, EntityValidationError)
        assert.deepEqual(error.message, 'Missing field "author"')
      }
    })

    it('throws an error if book title is missing', async () => {
      try {
        await bookRepository.save({
          author: 'Gene Kim',
        })
      } catch (error) {
        assert.instanceOf(error, EntityValidationError)
        assert.deepEqual(error.message, 'Missing field "title"')
      }
    })
  })
})
