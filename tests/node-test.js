import Node from '../scripts/node'
import { assert } from 'chai'

describe ('Node', () => {
  var node = new Node()

  it('should be an instance of Node', () => {

    assert.instanceOf(node, Node, 'node is an instance of Node')
  })

  it('should have a property of data which is an empty object unless data is passed in', () => {

    assert.equal(node.data, null)
  })

  it('should have a property of children, which starts as an empty object', () => {

    assert.deepEqual(node.children, {})
  })

  it('should have an isWord property, which is false by default', () => {

    assert.equal(node.isWord, false)
  })

})
