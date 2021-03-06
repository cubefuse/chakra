'use strict'
const Plugin = require('@chakrajs/plugin-interface')
const mockSchema = require('./mockSchema.json')

class MockPlugin extends Plugin {
  constructor () {
    super()
    this.name = 'mock'
    this.actions = new Map([
      [ 'testAction', mockSchema ]
    ])
    this.subscriptions = new Set([
      'mock.testAction'
    ])
    this.started = false
  }

  start () {
    this.started = true
  }
}

module.exports = MockPlugin
