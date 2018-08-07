'use strict'
const PubSub = require('pubsub-js')
const Message = require('./Message')
const Topic = require('./Topic')
const TopicRegistry = require('./TopicRegistry')

/**
 * Publish-subscribe event-bus
 */
class EventBus {
  /**
   * Create new event bus instance
   */
  constructor () {
    this._pubsub = PubSub
    this.registry = new TopicRegistry()
  }

  /**
   * Register a new topic with the event bus
   * @param {String} entity Entity the new topic relates to
   * @param {String} action Action the new topic relates to
   * @param {Object} schema JSON Schema for the topic
   * @returns {undefined}
   */
  register (entity, action, schema) {
    const newTopic = new Topic(entity, action)
    this.registry.register(newTopic, schema)
  }

  /**
   * Subscribe to a new topic
   * @param {String} entity Entity of the topic to subscribe to
   * @param {String} action Action of the topic to subscribe to.
   * @param {function} publishHandler Function to handle published data.
   * @returns { string } Subscription key for the subscription
   * @throws Will throw if the topic is not found.
   */
  subscribe (entity, action, publishHandler) {
    const topic = new Topic(entity, action)
    if (!this.registry.isRegistered(topic)) {
      throw new Error('Topic not found.')
    }

    return this._pubsub.subscribe(topic.getName(), publishHandler)
  }

  /**
   * Publish a new message
   * @param {String} entity Entity of the message topic
   * @param {String} action Action of the message topic
   * @param {Object} content Message to publish
   * @returns {undefined}
   * @throws {Error} Will throw if the message is invalid against the schema
   */
  publish (entity, action, content) {
    const topic = new Topic(entity, action)
    if (!this.registry.isRegistered(topic)) {
      throw new Error('Topic not found')
    }

    const message = new Message(topic, content)
    const isValid = this.registry.validate(message)
    if (isValid) {
      this._pubsub.publish(message.topic.getName(), message.content)
    } else {
      throw new Error('Message invalid')
    }
  }

  /**
   * Unsubscribe from a subscribed topic
   * @param {string} subscriptionKey Key that was returned when subscribing
   * @returns {undefined}
   */
  unsubscribe (subscriptionKey) {
    this._pubsub.unsubscribe(subscriptionKey)
  }
}

module.exports = EventBus
