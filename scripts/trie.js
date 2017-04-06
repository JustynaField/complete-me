import Node from './Node'
require('locus')
const text = "/usr/share/dict/words"
var fs = require('fs')
let dictionary = fs.readFileSync(text).toString().trim().split('\n')


export default class Trie {
  constructor() {
    this.root  = new Node('')
    this.count = 0
    this.suggestions = []
  }

  insert(word) {
    let letters = word.split('')
    let currentNode = this.root

    letters.forEach((letter, index) => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      } else {
        currentNode.children[letter] = new Node(letter)
        currentNode = currentNode.children[letter]
      }

      if (letters.length - 1 === index) {
        currentNode.isWord = true
        this.count++
      }
    })
  }

  suggest (input) {
    let currentNode = this.root

    for (var i = 0; i < input.length; i++) {
      let letter = input.charAt(i)

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    }
    return this.find(currentNode, input)
  }

  find (currentNode, word) {
    let inputKeys = Object.keys(currentNode.children)

    if (currentNode.isWord === true) {
      this.suggestions.push(word)
    }

    for (var i = 0; i < inputKeys.length; i++) {
      let node = currentNode.children[inputKeys[i]]

      this.find(node, word + inputKeys[i])
    }
  }

  populate() {
    dictionary.forEach(i => {
      this.insert(i)
    })
  }
}
