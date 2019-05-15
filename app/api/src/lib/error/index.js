class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message)

    this.name = 'ResourceNotFoundError'
    this.code = 404
  }
}

class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message)

    this.name = 'UnprocessableEntityError'
    this.code = 412
  }
}

module.exports = {
  ResourceNotFoundError,
  UnprocessableEntityError,
}
