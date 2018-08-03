/**
 * Topic of the event to publish
 */
class Topic {
  /**
   * Create a new topic
   * @param entity {string} Entity of the topic
   * @param action {string?} Action of the topic
   */
  constructor (entity, action) {
    if (!entity) throw new Error('Entity not specified')

    this.entity = entity
    this.action = action
  }

  /**
   * Returns the name of the topic
   * @returns {string} Name of the topic
   */
  getName () {
    return (this.action) ? this.entity + '.' + this.action : this.entity
  }
}

module.exports = Topic
