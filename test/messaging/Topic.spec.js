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

  it('can be created successfully', () => {
    expect(topic).to.exist()
    expect(topic.entity).to.be.eql(ENTITY_NAME)
    expect(topic.action).to.be.eql(ACTION_NAME)
  })

  it('outputs topic name correctly', () => {
    expect(topic.getName()).to.be.eql(ENTITY_NAME + TOPIC_SEPARATOR + ACTION_NAME)
    expect(topicWithoutAction.getName()).to.be.eql(ENTITY_NAME)
  })
})
