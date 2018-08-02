const Ajv = require('ajv')

/**
 * Schema registry for the topics
 */
class TopicRegistry {
  /**
   * Create new topic registry instance
   */
  constructor () {
    this.schema = {}
    this.validator = new Ajv()
  }

  /**
   * Add new topic to the registry
   * @param topic {Topic} Topic to add to the registry
   * @param schema {Object} Schema for the topic
   */
  add (topic, schema) {
    if (!this.schema[topic.getName()]) {
      this.schema[topic.getName()] = schema
    } else {
      throw new Error('Topic already exists.')
    }
  }

  /**
   * Get schema by topic name.
   * @param topic {Topic} Topic to get schema for.
   */
  getSchema (topic) {
    const schema = this.schema[topic.getName()]
    if (schema) {
      return schema
    } else {
      throw new Error('Topic not found.')
    }
  }

  /**
   * Validate a content against its schema
   * @param message {Message} Message to validate
   * @return {boolean | PromiseLike<any>} Whether the message is valid
   */
  validate (message) {
    return this.validator.validate(this.getSchema(message.topic), message.content)
  }
}

module.exports = TopicRegistry
