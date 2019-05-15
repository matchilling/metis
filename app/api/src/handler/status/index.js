module.exports = ({ app }) => {
  /**
   * @swagger
   * /status:
   *   get:
   *     description: Returns the application status
   *     responses:
   *       200:
   *         content: application/json
   *         schema:
   *           type: string
   *           example:
   *             status: ok
   */
  app.get('/status', (req, res, next) => {
    res.json({
      status: 'ok',
    })
  })
}
