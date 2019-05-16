const express = require('express')
const handler = require('./handler')
const routes = require('./routes')

module.exports = dependencies => {
  const { logger, graphite } = dependencies
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

  function logResponseTime(req, res, next) {
    const startHrTime = process.hrtime()

    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(startHrTime)
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1000

      const method = req.method || 'undefined_method'
      var path = req.route.path
        .replace(/\//g, '_')
        .replace(/\:/g, '')
        .substring(1)

      const metric = {
        [`metis.${method.toLowerCase()}.${res.statusCode}.${method}_${path}.response_time`]: elapsedTimeInMs,
      }
      graphite.write(metric, err => {
        if (err) {
          logger.error(err)
        }
      })
    })
    next()
  }
  app.use(logResponseTime)

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
