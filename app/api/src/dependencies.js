const BookRepository = require('./lib/bookRepository')
const bunyan = require('bunyan')
const MessageBroker = require('./lib/messageBroker')
const swaggerDocumentation = require('swagger-jsdoc')

module.exports = {
  bookRepository: new BookRepository(),
  logger: bunyan.createLogger({
    name: 'api',
  }),
  messageBroker: new MessageBroker(process.env.MESSAGE_QUEUE),
  swaggerDocumentation,
}
