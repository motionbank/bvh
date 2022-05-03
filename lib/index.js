const Parser = require('./parser'),
  BVH = require('./bvh')

exports.parse = function (str) {
  const lines = str.toString().replace('\r', '').split('\n')
  return new BVH((new Parser(lines)).parse())
}
