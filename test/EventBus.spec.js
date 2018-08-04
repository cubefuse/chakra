/* eslint-env mocha */
const EventBus = require('../src/EventBus')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
var chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(dirtyChai)

describe('Event Bus', () => {
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
  const MESSAGE = { 'data': { 'type': 1 } }

  let eventBus

  beforeEach((done) => {
    eventBus = new EventBus()
    done()
  })

  it('can be created successfully', () => {
    expect(eventBus).to.exist()
    expect(eventBus._pubsub).to.exist()
    expect(eventBus.registry).to.exist()
  })

  it('can register new topics', () => {
    expect(() => eventBus.register(ENTITY_NAME, ACTION_NAME, SCHEMA)).to.not.throw()
  })

  it('throws when subscribing to a topic that does not exist', () => {
    expect(() => eventBus.subscribe(ENTITY_NAME, ACTION_NAME)).to.throw('Topic not found.')
  })

  it('returns a subscription for existing topic', () => {
    eventBus.register(ENTITY_NAME, ACTION_NAME, SCHEMA)
    const subscriptionKey = eventBus.subscribe(ENTITY_NAME, ACTION_NAME)
    expect(subscriptionKey).to.exist()
  })

  it('can unsubscribe from a subscribed topic', () => {
    eventBus.register(ENTITY_NAME, ACTION_NAME, SCHEMA)
    const subscriptionKey = eventBus.subscribe(ENTITY_NAME, ACTION_NAME)
    expect(() => eventBus.unsubscribe(subscriptionKey)).to.not.throw()
  })

  it('successfully publishes a new message', () => {
    eventBus.register(ENTITY_NAME, ACTION_NAME, SCHEMA)
    const promise = new Promise(function (resolve) {
      eventBus.subscribe(ENTITY_NAME, ACTION_NAME, (topicName, message) => {
        resolve(message)
      })
    })
    eventBus.publish(ENTITY_NAME, ACTION_NAME, MESSAGE)

    expect(promise).to.be.fulfilled()
  })
})
