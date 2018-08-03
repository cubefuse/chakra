const EventEmitter = require('events').EventEmitter
const PubSub = require('pubsub-js')
const Topic = require('./Topic')
const Message = require('./Message')

/**
 * Subscription for a topic
 */
class Subscription {
  /**
   * Subscribe to a new topic
   * @param topic {Topic} Topic to subscribe to
   */
  constructor (topic) {
    this.topic = topic

    this._emitter = new EventEmitter()
    this._token = PubSub.subscribe(this.topic.getName(), this._subscriptionHandler())
  }

  /**
   * Cancel subscription
   */
  cancel () {
    PubSub.unsubscribe(this._token)
  }

  /**
   * Handles subscription logic
   * @param topicName {string} Name of the topic
   * @param content {Object} Content of the message
   * @private
   */
  _subscriptionHandler (topicName, content) {
    const topic = new Topic(...topicName.split('.'))
    const message = new Message(topic, content)
    this._emitter.emitEvent(message)
  }
}

module.exports = Subscription
