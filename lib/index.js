const Parser = require('./parser'),
  BVH = require('./bvh')

function getXHR () {
  // if node
  const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
  return new XMLHttpRequest()
  // end
  if (window.XMLHttpRequest &&
    (window.location.protocol != 'file:' || !window.ActiveXObject)) {
    return new XMLHttpRequest()
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP') } catch (e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0') } catch (e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0') } catch (e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP') } catch (e) {}
  }
  return false
}

exports.read = function (url, callback) {
  const xhr = getXHR()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(exports.parse(xhr.responseText))
      }
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

exports.parse = function (str) {
  const lines = str.replace('\r', '').split('\n')
  return new BVH((new Parser(lines)).parse())
}
