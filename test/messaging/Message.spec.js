/* eslint-env mocha */
'use strict'
const Topic = require('../../src/messaging/Topic')
const Message = require('../../src/messaging/Message')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('Message', () => {
  const ENTITY_NAME = 'TestEntity'
  const ACTION_NAME = 'TestAction'
  const MESSAGE_CONTENT = { testKey: 'testValue' }

  let message, topic

  beforeEach((done) => {
    topic = new Topic(ENTITY_NAME, ACTION_NAME)
    message = new Message(topic, MESSAGE_CONTENT)
    done()
  })

  it('can be created successfully', () => {
    expect(message).to.exist()
    expect(message.topic).to.be.eql(topic)
    expect(message.content).to.be.eql(MESSAGE_CONTENT)
  })
})
