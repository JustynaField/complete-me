export default class Node {
  constructor(data) {
    this.data = data || null;
    this.children = {};
    this.isWord = false;
    this.numUsed = 0
  }
}
