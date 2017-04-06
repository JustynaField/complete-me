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
    this.prefSuggestions = []
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

  find (currentNode, input) {
    let furtherNode = Object.keys(currentNode.children)

    if (currentNode.isWord === true) {
      this.suggestions.push(input)
    }

    for (var i = 0; i < furtherNode.length; i++) {
      let nextNode = currentNode.children[furtherNode[i]]

      this.find(nextNode, input + furtherNode[i])
    }
    return this.suggestions
  }

  select () {
    //create a counter (e.g. numUsed) for each word, showing how often it's used

    //loop through suggestions - compare counters of suggested words
    //if counter is high (e.g. > 3), then push frequent word to the prefSuggestions array
    this.suggestions.filter(word => {
      if(numUsed > 3) {
        this.prefSuggestions.push(word)
      }
    })

    //in the find function - return prefSuggestions, before suggestions

    //you can loop through prefSuggestions array and order it in decreasing order based on counter value
  }

  populate() {
    dictionary.forEach(i => {
      this.insert(i)
    })
  }
}
