const wrap = require('../../lib/middleware/wrap')

module.exports = ({ app, bookRepository, logger }) => {
  /**
   * @swagger
   * /book/{id}:
   *   get:
   *     summary: Get a book by id
   *     produces: application/json
   *     parameters:
   *       - name: id
   *         in:  path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Book'
   *       404:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Error'
   */
  app.get(
    '/book/:id',
    wrap(async (req, res, next) => {
      res.json(await bookRepository.fetch(req.params.id))
    })
  )

  app.get(
    '/book/:id/publish',
    wrap(async (req, res, next) => {
      res.json({
        publishedAt: new Date().toISOString(),
      })
    })
  )

  /**
   * @swagger
   * /book:
   *   post:
   *     summary: Create a book
   *     produces: application/json
   *     parameters:
   *       - name: author
   *         in:  body
   *         required: true
   *         type: string
   *       - name: title
   *         in:  body
   *         required: true
   *         type: string
   *       - name: published
   *         in:  body
   *         required: false
   *         type: boolean
   *     responses:
   *       200:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Book'
   *       400:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Error'
   */
  app.post(
    '/book',
    wrap(async (req, res, next) => {
      res.json(
        await bookRepository.save({
          author: req.body.author,
          title: req.body.title,
          published: req.body.published,
        })
      )
    })
  )
}
