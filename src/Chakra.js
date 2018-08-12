'use strict'
const EventBus = require('./messaging/EventBus')
const Plugin = require('@chakrajs/plugin-interface')
const ChakraStatusPlugin = require('./plugins/ChakraStatus')

/**
 * Chakra main class
 */
class Chakra {
  /**
   * Creates a new Chakra instance
   * @param {Object} config Configuration of the Chakra instance
   * @param {string} config.name Name of the Chakra app
   * @param {string} config.version Version of the Chakra app
   */
  constructor (config = {}) {
    this.config = config
    this._eventBus = new EventBus()
    this._plugins = new Map()
    this._internalPlugins = {
      status: new ChakraStatusPlugin()
    }
    this.plug(this._internalPlugins.status)
  }

  /**
   * Register new plugins with Chakra
   * @param {...Plugin} plugins List of Plugin objects to register
   * @returns {undefined}
   * @throws {Error} Will throw on plugin registration failure
   */
  plug (...plugins) {
    for (const plugin of plugins) {
      if (!(plugin instanceof Plugin)) throw new Error('Invalid plugin')

      // Register subscriptions exposed by this plugin
      for (const [action, schema] of plugin.actions.entries()) {
        this._eventBus.register(plugin.name, action, schema)
      }

      // Subscribe to requested subscriptions
      for (const topicName of plugin.subscriptions) {
        this._eventBus.subscribe(...topicName.split('.', 2), plugin.handleMessage)
      }

      this._plugins.set(plugin.name, plugin)
    }
  }

  /**
   * Start the Chakra application
   * @returns {undefined}
   */
  start () {
    // Start all plugins
    for (const plugin of this._plugins.values()) {
      // Add message publish function to the plugin
      plugin.publish = (action, message) => this._eventBus.publish(plugin.name, action, message)
      plugin.start()
    }

    // Publish Chakra.Started message
    this._internalPlugins.status.publishStartedMessage({
      name: this.config.name,
      version: this.config.version
    })
  }
}

module.exports = Chakra
