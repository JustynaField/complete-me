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
    let furtherNode = Object.keys(currentNode.children)

    if (currentNode.isWord === true) {
      this.suggestions.push(word)
      currentNode.numUsed++
      // this.prioritySuggestions(this.suggestions)
    }

    for (var i = 0; i < furtherNode.length; i++) {
      let nextNode = currentNode.children[furtherNode[i]]

      this.find(nextNode, word + furtherNode[i])
    }
    // return this.suggestions
    return this.prioritySuggestions(this.suggestions)
    // return this.bubbleSort(suggestions)
  }

  prioritySuggestions (array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < array.length; j++) {

        if (array[j] > array[j - 1]) {
          let temp = array[j]

          array[j] = array[j - 1]
          array[j - 1] = temp
        }
      }
    }
    return array
  }


    // select (input) {
    //   let currentNode = this.root
    //
    //   for (var i = 0; i < input.length; i++) {
    //     let letter = input.charAt(i)
    //
    //     if (currentNode.children[letter]) {
    //       currentNode = currentNode.children[letter]
    //     }
    //   }
    //   let furtherNode = Object.keys(currentNode.children)
    //
    //   if (currentNode.isWord === true) {
    //     currentNode.numUsed++
    //   }
    //
    // }


  populate() {
    dictionary.forEach(i => {
      this.insert(i)
    })
  }
}
