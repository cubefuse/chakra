'use strict'
const Plugin = require('@chakrajs/plugin-interface')
const StartedSchema = require('./schema/ChakraStatus.Started.json')

const STARTED = 'Started'

/**
 * Chakra framework's built-in Status plugin
 */
// eslint-disable-next-line no-unused-vars
class ChakraStatus extends Plugin {
  /**
   * Create a new ChakraStatus plugin instance
   */
  constructor () {
    super()

    this.name = 'Chakra'
    this.actions = new Map([
      [STARTED, StartedSchema]
    ])
  }

  /**
   * Publish Chakra.Started message
   * @param {Object} appData Details about the Chakra app
   * @param {string} [appData.name = 'App'] Name of the Chakra app
   * @param {string} [appData.version = '1.0.0'] Version of the Chakra app
   * @returns {undefined}
   */
  publishStartedMessage (appData = {name: 'App', version: '1.0.0'}) {
    this.publish(STARTED, {
      appName: appData.name,
      version: appData.version
    })
  }
}

module.exports = ChakraStatus
