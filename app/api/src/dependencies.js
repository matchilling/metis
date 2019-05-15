const BookRepository = require('./lib/bookRepository')
const bunyan = require('bunyan')
const swaggerDocumentation = require('swagger-jsdoc')

module.exports = {
  bookRepository: new BookRepository(),
  logger: bunyan.createLogger({
    name: 'api',
  }),
  swaggerDocumentation,
}
