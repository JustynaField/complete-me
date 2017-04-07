import Node from './Node'
require('locus')
const text = "/usr/share/dict/words"
var fs = require('fs')
let dictionary = fs.readFileSync(text).toString().trim().split('\n')


export default class Trie {
  constructor() {
    this.root  = new Node('')
    this.count = 0
    // this.suggestions = []
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
    // console.log('consoled:',this.find(currentNode, input))
    return this.find(currentNode, input)
  }

  find (currentNode, input, currentArray) {
    let furtherNode = Object.keys(currentNode.children)
    let array2 = currentArray || []

    if (currentNode.isWord === true) {
      array2.push({numUsed: currentNode.numUsed, input})
    }

    for (var i = 0; i < furtherNode.length; i++) {
      let nextNode = currentNode.children[furtherNode[i]]

      this.find(nextNode, input + furtherNode[i], array2)
    }

    var suggestions = this.prioritySuggestions(array2)

    return suggestions
  }



  select (input) {
    let currentNode = this.root

    for (var i = 0; i < input.length; i++) {
      let letter = input.charAt(i)

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    }

    if (currentNode.isWord === true) {
      currentNode.numUsed++
    }

  }

  prioritySuggestions (array) {

    let sortedSuggestions = array.sort((valueA, valueB) => {
      return valueB['numUsed'] - valueA['numUsed']
    })
    let mapped = sortedSuggestions.map((val) => {
      return val['input']
    })

    return mapped

  }

  populate() {
    dictionary.forEach(i => {
      this.insert(i)
    })
  }
}
