export default class Node {
  constructor(data) {
    this.data = data || null;
    this.children = {};
    this.isWord = false;
  }
}
