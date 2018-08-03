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
})
