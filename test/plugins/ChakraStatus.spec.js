/* eslint-env mocha */
'use strict'
const ChakraStatusPlugin = require('../../src/plugins/ChakraStatus')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
var chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(dirtyChai)

const STARTED_ACTION = 'Started'
const STARTED_INPUT = {name: 'TestStatusApp', version: '3.0.0'}
const STARTED_MESSAGE = {appName: 'TestStatusApp', version: '3.0.0'}
const STARTED_MESSAGE_DEFAULT = {appName: 'App', version: '1.0.0'}

describe('ChakraStatus', () => {
  let plugin

  beforeEach((done) => {
    plugin = new ChakraStatusPlugin()
    plugin.publish = sinon.fake()
    done()
  })

  it('can be started correctly', () => {
    expect(plugin).to.exist()
  })

  it('publishes default Chakra.Started message when appData is not provided', () => {
    expect(() => plugin.publishStartedMessage()).to.not.throw()
    expect(plugin.publish.calledOnce).to.be.eql(true)
    expect(plugin.publish.calledWithExactly(STARTED_ACTION, STARTED_MESSAGE_DEFAULT)).to.be.eql(true)
  })

  it('publishes Chakra.Started message when appData is provided', () => {
    expect(() => plugin.publishStartedMessage(STARTED_INPUT)).to.not.throw()
    expect(plugin.publish.calledOnce).to.be.eql(true)
    expect(plugin.publish.calledWithExactly(STARTED_ACTION, STARTED_MESSAGE)).to.be.eql(true)
  })
})
