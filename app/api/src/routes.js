const handler = require('./handler')

module.exports.setup = dependencies => {
  handler.book(dependencies)
  handler.documentation(dependencies)
  handler.status(dependencies)
}
