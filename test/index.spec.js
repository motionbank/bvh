require('chai').should()

const bvh = require('../lib'),
  BVH = require('../lib/bvh'),
  BVHNode = require('../lib/bvh_node'),
  // Parser = require('../lib/parser'),
  fs = require('fs'),
  path = require('path')

describe('bvh.js', function () {
  it('should expose .parse()', function () {
    bvh.parse.should.be.a('function')
  })

  it('should parse a BVH file\'s contents', function (done) {
    const bvhFile = fs.readFileSync(path.join(__dirname, 'fixtures', 'A_test.bvh'))
    const motion = bvh.parse(bvhFile)
    motion.should.be.instanceof(BVH)
    done()
  })
})

describe('Parser', function () {
  // TODO: put test for Parser
  it('should pass test', function (done) {
    done()
  })
})

describe('BVH', function () {
  const str = require('fs').readFileSync(path.join(__dirname, 'fixtures', 'A_test.bvh')).toString('utf-8')
  const motion = bvh.parse(str)

  it('should be instance of BVH', function () {
    motion.should.be.instanceof(BVH)
  })

  it('should expose .at()', function () {
    motion.at.should.be.a('function')
  })

  it('should expose .of()', function () {
    motion.of.should.be.a('function')
  })

  it('should have frameTime', function () {
    motion.should.have.property('frameTime')
  })

  it('should have numFrames', function () {
    motion.should.have.property('numFrames')
  })

  describe('nodeList', function () {
    const nodeList = motion.nodeList

    it('should be instance of Array', function () {
      nodeList.should.be.instanceof(Array)
    })
  })

  describe('node', function () {
    const head = motion.of('Head')

    it('should instance of BVHNode', function () {
      head.should.be.instanceof(BVHNode)
    })
  })
})
