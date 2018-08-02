/**
 * Data to be published through the event bus
 */
class Message {
  /**
   * Create a new content
   * @param topic {Topic} Topic of the content
   * @param content {Object} Message content JSON
   */
  constructor (topic, content) {
    this.topic = topic
    this.content = content
  }
}

module.exports = Message
