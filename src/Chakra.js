const EventBus = require('./messaging/EventBus')

/**
 * Creates a new Chakra instance
 */
class Chakra {
  constructor () {
    this.eventBus = new EventBus()
  }
}

module.exports = Chakra