'use strict'
const EventBus = require('./messaging/EventBus')
const Plugin = require('./plugin/Plugin')

/**
 * Chakra main class
 */
class Chakra {
  /**
   * Creates a new Chakra instance
   */
  constructor () {
    this._eventBus = new EventBus()
    this._plugins = new Map()
  }

  /**
   * Register new plugins with Chakra
   * @param {...Plugin} plugins List of Plugin objects to register
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
   */
  start () {
    // Start all plugins
    for (const plugin of this._plugins.values()) {
      // Add message publish function to the plugin
      plugin.publish = (action, message) => this._eventBus.publish(plugin.name, action, message)
      plugin.start()
    }
  }
}

// Export plugin interface for custom plugin implementations
Chakra.Plugin = Plugin

module.exports = Chakra
