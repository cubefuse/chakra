const Ajv = require('ajv')

/**
 * Schema registry for the topics
 */
class TopicRegistry {
  /**
   * Create new topic registry instance
   */
  constructor () {
    this.schemas = {}
    this.validator = new Ajv()
  }

  /**
   * Add new topic to the registry
   * @param {Topic} topic Topic to register with the registry
   * @param {Object} schema Schema for the topic
   */
  register (topic, schema) {
    if (!this.isRegistered(topic)) {
      this.schemas[topic.getName()] = schema
    } else {
      throw new Error('Topic already exists.')
    }
  }

  /**
   * Check if a given topic is registered with the registry.
   * @param {Topic} topic Topic to verify registration
   * @return {boolean} Whether the topic is already registered
   */
  isRegistered (topic) {
    return !!this.schemas[topic.getName()]
  }

  /**
   * Get schema by topic name.
   * @param {Topic} topic Topic to get schema for.
   */
  getSchema (topic) {
    const schema = this.schemas[topic.getName()]
    if (schema) {
      return schema
    } else {
      throw new Error('Topic not found.')
    }
  }

  /**
   * Validate a content against its schema
   * @param {Message} message Message to validate
   * @return {boolean} Whether the message is valid
   */
  validate (message) {
    if (this.isRegistered(message.topic)) {
      return this.validator.validate(this.getSchema(message.topic), message.content)
    } else {
      return false
    }
  }
}

module.exports = TopicRegistry
