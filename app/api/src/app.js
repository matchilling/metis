const express = require('express')
const handler = require('./handler')
const routes = require('./routes')

module.exports = dependencies => {
  const { logger } = dependencies
  const app = express()

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.use(express.json())

  // Set up routes
  routes.setup({
    ...dependencies,
    app,
  })

  // Add error handler
  app.use((error, req, res, next) => {
    logger.error(error)

    const gracefullyHandleErrors = [400, 404, 412]
    if (-1 < gracefullyHandleErrors.indexOf(error.code)) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message || '',
      })
    }

    res.status(500).send()
    next()
  })

  return app
}
