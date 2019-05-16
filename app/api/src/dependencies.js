const BookRepository = require('./lib/bookRepository')
const bunyan = require('bunyan')
const graphite = require('graphite')
const MessageBroker = require('./lib/messageBroker')
const swaggerDocumentation = require('swagger-jsdoc')

module.exports = {
  bookRepository: new BookRepository(),
  graphite: graphite.createClient(`plaintext://${process.env.GRAPHITE_URL}`),
  logger: bunyan.createLogger({
    name: 'api',
  }),
  messageBroker: new MessageBroker(process.env.MESSAGE_QUEUE),
  swaggerDocumentation,
}
