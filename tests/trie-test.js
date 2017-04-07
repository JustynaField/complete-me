import { assert } from 'chai'
import Trie from '../scripts/trie'
import Node from '../scripts/node'
var locus = require('locus')

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

  it('should not define word if it is not on the last node', () => {
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

  it.skip('should return an array', () => {

    assert.equal(Array.isArray(trie.suggestions), true)
  })

  it.skip('should return words on suggestions', () => {
    trie.insert('pizza')
    trie.suggest('piz')

    assert.deepEqual(trie.suggestions, ['pizza'])
  })

  it.skip('should give multiple suggestions on a word', () => {
    let trie = new Trie()

    trie.insert('art')
    trie.insert('artist')
    trie.insert('army')
    trie.insert('armenia')

    // eval(locus)

    trie.suggest('ar')
    assert.deepEqual(trie.suggestions, ['artist', 'art', 'army', 'armenia'])
  })

  it.skip('should include dictionary', () => {
    trie.populate()
    assert.equal(trie.count, 235888)
  })

  it('should recommend suggestions based on how often we use given word', () => {
    var trie = new Trie()

    trie.insert('alaska')
    trie.insert('alabama')
    trie.insert('alpharetta')
    trie.insert('albania')

    trie.select('alaska')
    trie.select('alabama')
    trie.select('alpharetta')
    trie.select('alaska')
    trie.select('albania')
    trie.select('alabama')
    trie.select('alaska')

    let result = trie.suggest('al')

    assert.deepEqual(result, ['alaska', 'alabama', 'alpharetta',  'albania'])
  })

})
