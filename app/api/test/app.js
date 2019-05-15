const createApp = require('./../src/app')
const defaultDependencies = require('./../src/dependencies')

if (defaultDependencies.hasOwnProperty('logger')) {
  // Deactivate logger in test env by default
  defaultDependencies.logger.fatal = () => undefined
  defaultDependencies.logger.error = () => undefined
  defaultDependencies.logger.warn = () => undefined
  defaultDependencies.logger.info = () => undefined
  defaultDependencies.logger.debug = () => undefined
  defaultDependencies.logger.trace = () => undefined
}

module.exports = dependencies => {
  const options = dependencies
    ? Object.keys(defaultDependencies).reduce((acc, key) => {
        acc[key] = dependencies.hasOwnProperty(key)
          ? dependencies[key]
          : defaultDependencies[key]

        return acc
      }, {})
    : defaultDependencies

  return createApp(options)
}
