import { assert } from 'chai'
import Trie from '../scripts/trie'
import Node from '../scripts/node'
require('locus')

describe('Trie', () => {
  var trie = new Trie()

  it('should be an instance of Trie', () => {

    assert.instanceOf(trie, Trie, 'trie is instance of Trie')
  })

  it('should have a root property which is an instance of Node', () => {
    trie.root = new Node('')

    assert.instanceOf(trie.root, Node, 'root is an instance of Node')
  })

  it('should start with count 0', () => {

    assert.equal(trie.count, 0)
  })

  it('should have a method called insert', () => {

    assert.isFunction(trie.insert)
  })

  it('should be able to insert the word', () => {
    let word = 'ray'

    trie.insert(word)
    assert.equal(trie.root.children.r.children.a.children.y.isWord, true)
  })

  it('should not recognize it as a word', () => {
    let word = 'ray'

    trie.insert(word)

    assert.equal(trie.root.children.r.isWord, false)
  })

  it('should start with an empty node', () => {
    let trie = new Trie()

    assert.equal(trie.root.data, null)
  })

  it('should count words', () => {
    trie.count = 0

    trie.insert('art')
    assert.equal(trie.count, 1)
  })

  it('should have a method called find', () => {

    assert.isFunction(trie.find)
  })

  it('should have a method called suggest', () => {

    assert.isFunction(trie.suggest)
  })

  it('should return words on suggestions', () => {
    trie.insert('pizza')
    trie.suggest('piz')

    assert.deepEqual(trie.suggestions, ['pizza'])
  })

  it('should include dictionary', () => {
    trie.populate()

    assert.equal(trie.count, 235888)
  })


})
