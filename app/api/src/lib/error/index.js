class EntityValidationError extends Error {
  constructor(message) {
    super(message)

    this.name = 'EntityValidationError'
    this.code = 400
  }
}

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
  EntityValidationError,
  ResourceNotFoundError,
  UnprocessableEntityError,
}
