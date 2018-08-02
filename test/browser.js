/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const HelloWorld = require('../src')

describe('browser', () => {
  let hello

  beforeEach((done) => {
    hello = new HelloWorld()
    done()
  })

  it('loads successfully', () => {
    expect(hello).to.exist()
  })

  it('outputs default test string', () => {
    expect(hello.sayHello()).to.be.eql('Hello World')
  })

  it('outputs default test string', () => {
    const testString = 'Yet another test string'

    hello.testString = testString
    expect(hello.sayHello()).to.be.eql(testString)
  })
})
