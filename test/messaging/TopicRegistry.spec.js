/* eslint-env mocha */
const Topic = require('../../src/messaging/Topic')
const Message = require('../../src/messaging/Message')
const TopicRegistry = require('../../src/messaging/TopicRegistry')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('Topic', () => {
  const ENTITY_NAME = 'TestEntity'
  const ACTION_NAME = 'TestAction'
  const SCHEMA = {
    '$id': 'http://example.com/example.json',
    'type': 'object',
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'properties': {
      'type': {
        '$id': '/properties/type',
        'type': 'integer'
      }
    }
  }

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
    expect(topicRegistry.schemas[topic.getName()]).to.exist()
    expect(topicRegistry.schemas[topic.getName()]).to.be.eql(SCHEMA)
  })

  it('throws on existing topic', () => {
    expect(() => topicRegistry.register(topic, {})).to.throw('Topic already exists.')
  })

  it('returns schema for existing topic', () => {
    expect(topicRegistry.getSchema(topic)).to.be.eql(SCHEMA)
  })

  it('validation returns true for valid message', () => {
    const message = new Message(topic, { 'data': { 'type': 1 } })
    expect(topicRegistry.validate(message)).to.be.eql(true)
  })

  it('validation returns false for invalid message', () => {
    const message = new Message(topic, { 'type': 'test' })
    expect(topicRegistry.validate(message)).to.be.eql(false)
  })
})
