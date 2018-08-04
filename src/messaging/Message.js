'use strict'
/**
 * Data to be published through the event bus
 */
class Message {
  /**
   * Create a new message
   * @param {Topic} topic Topic of the content
   * @param {Object} content Message content JSON
   */
  constructor (topic, content) {
    this.topic = topic
    this.content = content
  }
}

module.exports = Message
