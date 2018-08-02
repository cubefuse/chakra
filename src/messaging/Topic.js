/**
 * Topic of the event to publish
 */
class Topic {
  /**
   * Create a new topic
   * @param entity {string} Entity of the topic
   * @param action {string} Action of the topic
   */
  constructor (entity, action) {
    this.entity = entity
    this.action = action
  }

  /**
   * Returns the name of the topic
   * @returns {string} Name of the topic
   */
  getName () {
    return this.entity + '.' + this.action
  }
}

module.exports = Topic
