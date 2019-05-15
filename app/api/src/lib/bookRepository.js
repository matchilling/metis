const {
  EntityValidationError,
  ResourceNotFoundError,
  UnprocessableEntityError,
} = require('./error')
const uuid4 = require('uuid/v4')

const books = [
  {
    id: '66F5A4E8-7A78-44B4-A7E0-7E202AC6B7D5',
    author: 'Gene Kim',
    title:
      'The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win',
    published: false,
  },
]

class BookRepository {
  async fetch(id) {
    const result = books.filter(book => book.id === id)
    if (result.length !== 1) {
      throw new ResourceNotFoundError(`Book with id "${id}" does not exist`)
    }

    return result[0]
  }

  async publish(id) {
    const book = await this.fetch(id)
    if (book.published) {
      throw new UnprocessableEntityError(`Book has already been published`)
    }

    const publishedAt = new Date().toISOString()
    await this.save({
      ...book,
      published: true,
    })

    return {
      publishedAt,
    }
  }

  async save(data) {
    if (!data.author) {
      throw new EntityValidationError('Missing field "author"')
    }
    if (!data.title) {
      throw new EntityValidationError('Missing field "title"')
    }

    const book = {
      id: data.id || uuid4(),
      author: data.author,
      title: data.title,
      published: data.published || false,
    }

    books.push(book)

    return book
  }
}

module.exports = BookRepository
