/* eslint-env mocha */
const Topic = require('../../src/messaging/Topic')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('Topic', () => {
  const ENTITY_NAME = 'TestEntity'
  const ACTION_NAME = 'TestAction'
  const TOPIC_SEPARATOR = '.'

  let topic, topicWithoutAction

  beforeEach((done) => {
    topic = new Topic(ENTITY_NAME, ACTION_NAME)
    topicWithoutAction = new Topic(ENTITY_NAME)
    done()
  })

  it('can be created successfully with entity and action name', () => {
    expect(topic).to.exist()
    expect(topic.entity).to.be.eql(ENTITY_NAME)
    expect(topic.action).to.be.eql(ACTION_NAME)
  })

  it('can be created successfully with only entity name', () => {
    expect(topicWithoutAction).to.exist()
    expect(topicWithoutAction.entity).to.be.eql(ENTITY_NAME)
    expect(topicWithoutAction.action).to.be.undefined()
  })

  it('throws when creating without an entity name', () => {
    expect(() => new Topic()).to.throw('Entity not specified')
  })

  it('outputs topic name correctly', () => {
    expect(topic.getName()).to.be.eql(ENTITY_NAME + TOPIC_SEPARATOR + ACTION_NAME)
    expect(topicWithoutAction.getName()).to.be.eql(ENTITY_NAME)
  })
})
