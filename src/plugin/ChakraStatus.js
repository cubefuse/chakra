'use strict'
const Chakra = require('../Chakra')

/**
 * Chakra framework's built-in Status plugin
 */
// eslint-disable-next-line no-unused-vars
class ChakraStatus extends Chakra.Plugin {
  constructor () {
    super()

    this.name = 'ChakraStatus'
    this.actions = new Map()
  }
}
