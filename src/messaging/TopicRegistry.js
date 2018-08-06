'use strict'
const Ajv = require('ajv')

/**
 * Schema registry for the topics
 */
class TopicRegistry {
  /**
   * Create new topic registry instance
   */
  constructor () {
    this.schemas = new Map()
    this.validator = new Ajv()
  }

  /**
   * Add new topic to the registry
   * @param {Topic} topic Topic to register with the registry
   * @param {Object} schema Schema for the topic
   * @returns {undefined}
   * @throws {Error} Will throw if topic is already registered
   */
  register (topic, schema) {
    if (!this.schemas.has(topic.getName())) {
      this.schemas.set(topic.getName(), schema)
    } else {
      throw new Error('Topic already exists.')
    }
  }

  /**
   * Check if a given topic is registered with the registry.
   * @param {Topic} topic Topic to verify registration
   * @returns {boolean} Whether the topic is already registered
   */
  isRegistered (topic) {
    return this.schemas.has(topic.getName())
  }

  /**
   * Get schema by topic name.
   * @param {Topic} topic Topic to get schema for.
   * @returns {undefined}
   */
  getSchema (topic) {
    const schema = this.schemas.get(topic.getName())
    if (schema) {
      return schema
    } else {
      throw new Error('Topic not found.')
    }
  }

  /**
   * Validate a content against its schema
   * @param {Message} message Message to validate
   * @returns {boolean} Whether the message is valid
   */
  validate (message) {
    if (this.isRegistered(message.topic)) {
      return Boolean(this.validator.validate(this.getSchema(message.topic), message.content))
    } else {
      return false
    }
  }
}

module.exports = TopicRegistry
