/* eslint-env mocha */
'use strict'
const Chakra = require('../src/Chakra')
const MockPlugin = require('./mocks/MockPlugin')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
var chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(dirtyChai)

describe('Chakra', () => {
  let chakra, plugin

  beforeEach((done) => {
    chakra = new Chakra()
    plugin = new MockPlugin()
    done()
  })

  it('can be created successfully', () => {
    expect(chakra).to.exist()
    expect(chakra._eventBus).to.exist()
    expect(chakra._plugins).to.exist()
  })

  it('exports plugin interface', () => {
    expect(Chakra.Plugin).to.exist()
    expect(typeof Chakra.Plugin).to.eql('function')
  })

  it('can add new plugins correctly', () => {
    expect(() => chakra.plug(plugin)).to.not.throw()
    expect(chakra._eventBus.registry.schemas.size).to.eql(1)
    expect(chakra._plugins.size).to.eql(1)
    expect(chakra._plugins.has(plugin.name)).to.eql(true)
  })

  it('throws when trying to plug invalid plugins', () => {
    const array = []
    expect(() => chakra.plug(array)).to.throw('Invalid plugin')
  })

  it('can start correctly', () => {
    chakra.plug(plugin)
    chakra.start()

    // Check whether plugins are started
    expect(chakra._plugins.get(plugin.name).publish).to.exist()
    expect(typeof chakra._plugins.get(plugin.name).publish).to.eql('function')
    expect(chakra._plugins.get(plugin.name).started).to.eql(true)
  })
})
