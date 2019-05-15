const amqp = require('amqplib')

class MessageBroker {
  constructor(url) {
    this.connection
    this.url = url
  }

  async connect() {
    if (this.connection) {
      return this.connection
    } else {
      return await amqp.connect(this.url)
    }
  }

  async sendMessage(queue, payload) {
    const connection = await this.connect()
    const channel = await connection.createChannel()
    const ok = await channel.assertQueue(queue, { durable: false })

    channel.sendToQueue(queue, Buffer.from(payload))
    await channel.close()

    return true
  }
}

module.exports = MessageBroker
