/**
 * Topic of the event to publish
 */
class Topic {
  /**
   * Create a new topic
   * @param {string} entity Entity of the topic
   * @param {string} [action] Action of the topic.
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
    return (this.action) ? this.entity + '.' + this.action : this.entity
  }
}

module.exports = Topic
