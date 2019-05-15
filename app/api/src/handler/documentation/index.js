const swaggerDefinition = require('./../../../config/swagger/definition.json')

module.exports = ({ app, swaggerDocumentation }) => {
  /**
   * @swagger
   * /documentation:
   *   get:
   *     description: Returns the api documentation in swagger format
   *   produces:
   *       - application/json
   */
  app.get('/documentation', (req, res, next) => {
    const swaggerSpecification = swaggerDocumentation({
      swaggerDefinition,
      apis: ['./src/handler/**/*.js'],
    })

    res.json(swaggerSpecification)
  })
}
