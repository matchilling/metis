const { logger } = require('../../dependencies')

module.exports = asyncFunction => {
  return (req, res, next) => {
    return Promise.resolve(asyncFunction(req, res, next)).catch(next)
  }
}
