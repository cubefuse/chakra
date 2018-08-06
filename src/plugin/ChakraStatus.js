const Chakra = require('../Chakra')

/**
 * Chakra framework's built-in Status plugin
 */
class ChakraStatus extends Chakra.Plugin {
  constructor () {
    super()

    this.name = 'ChakraStatus'
    this.actions = new Map()
  }
}
