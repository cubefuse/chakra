/* eslint-env mocha */
'use strict'
const Topic = require('../../src/messaging/Topic')
const Message = require('../../src/messaging/Message')
const TopicRegistry = require('../../src/messaging/TopicRegistry')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('Topic Registry', () => {
  const ENTITY_NAME = 'TestEntity'
  const ACTION_NAME = 'TestAction'
  const SCHEMA = {
    $id: 'http://example.com/example.json',
    type: 'object',
    definitions: {},
    $schema: 'http://json-schema.org/draft-07/schema#',
    properties: {
      type: {
        $id: '/properties/type',
        type: 'integer'
      }
    }
  }
  const VALID_MESSAGE = { data: { type: 1 } }
  const INVALID_MESSAGE = { type: 'test' }

  let topic, topicRegistry

  beforeEach((done) => {
    topic = new Topic(ENTITY_NAME, ACTION_NAME)
    topicRegistry = new TopicRegistry()
    topicRegistry.register(topic, SCHEMA)
    done()
  })

  it('can be created successfully', () => {
    expect(topicRegistry).to.exist()
  })

  it('topics can be registered correctly', () => {
    expect(topicRegistry.schemas.get(topic.getName())).to.exist()
    expect(topicRegistry.schemas.get(topic.getName())).to.be.eql(SCHEMA)
  })

  it('throws on existing topic', () => {
    expect(() => topicRegistry.register(topic, {})).to.throw('Topic already exists.')
  })

  it('returns schema for existing topic', () => {
    expect(topicRegistry.getSchema(topic)).to.be.eql(SCHEMA)
  })

  it('throws if schema not found', () => {
    const topicWithoutSchema = new Topic(ENTITY_NAME)
    expect(() => topicRegistry.getSchema(topicWithoutSchema)).to.throw()
  })

  it('returns true for registered topic', () => {
    expect(topicRegistry.isRegistered(topic)).to.be.eql(true)
  })

  it('returns false for unregistered topic', () => {
    const topicWithoutSchema = new Topic(ENTITY_NAME)
    expect(topicRegistry.isRegistered(topicWithoutSchema)).to.be.eql(false)
  })

  it('validation returns true for valid message', () => {
    const message = new Message(topic, VALID_MESSAGE)
    expect(topicRegistry.validate(message)).to.be.eql(true)
  })

  it('validation returns false for invalid message', () => {
    const message = new Message(topic, INVALID_MESSAGE)
    expect(topicRegistry.validate(message)).to.be.eql(false)
  })
})
