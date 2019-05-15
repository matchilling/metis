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

  /**
   * @swagger
   * /book/{id}/publish:
   *   get:
   *     summary: Publish a book
   *     produces: application/json
   *     parameters:
   *       - name: id
   *         in:  path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         content: application/json
   *         schema:
   *           type: string
   *           example:
   *             publishedAt: "2019-05-15T09:57:41.379Z"
   *       404:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Error'
   *       412:
   *         schema:
   *           content: application/json
   *           type: object
   *           $ref: '#/definitions/Error'
   */
  app.get(
    '/book/:id/publish',
    wrap(async (req, res, next) => {
      res.json(await bookRepository.publish(req.params.id))
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
