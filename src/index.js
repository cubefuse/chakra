'use strict'

/**
 * Hello world function that returns a string with "Hello World"
 * @returns {string} The string "Hello World"
 */
class HelloWorld {
  constructor () {
    this.testString = 'Hello World'
  }

  sayHello () {
    return this.testString
  }
}

module.exports = HelloWorld
