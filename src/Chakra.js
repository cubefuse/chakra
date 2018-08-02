const EventBus = require('./messaging/EventBus')

/**
 * Creates a new Chakra instance
 */
class Chakra {
  constructor () {
    this.testString = 'Hello World'
    this.eventBus = new EventBus()
  }

  sayHello () {
    return this.testString
  }
}

module.exports = Chakra
