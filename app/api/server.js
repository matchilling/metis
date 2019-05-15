const createApp = require('./src/app')
const dependencies = require('./src/dependencies')
const logger = dependencies.logger

if (!process.env.PORT) throw new Error('Missing environment variable "PORT".')

createApp(dependencies).listen(process.env.PORT, () => {
  logger.info('Listening on port ' + process.env.PORT)
})
