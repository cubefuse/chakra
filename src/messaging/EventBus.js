const PubSub = require('pubsub-js')
const TopicRegistry = require('./TopicRegistry')
const Subscription = require('./Subscription')

/**
 * Publish / Subscribe event bus
 */
class EventBus {
  /**
   * Create new event bus instance
   */
  constructor () {
    this.pubsub = PubSub
    this.registry = new TopicRegistry()
  }

  /**
   * Publish a new message
   * @param message {Message} Message to publish
   * @throws {Error} Message invalid error
   */
  publish (message) {
    const isValid = this.registry.validate(message)
    if (isValid) {
      this.pubsub.publish(message.topic.getName(), message.content)
    } else {
      throw new Error('Message invalid')
    }
  }

  /**
   * Subscribe to a new topic
   * @param topic {Topic} Topic to subscribe to
   * @return { Subscription } Subscription for the topic
   */
  subscribe (topic) {
    return new Subscription(topic)
  }
}

module.exports = EventBus
