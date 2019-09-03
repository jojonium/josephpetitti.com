/* (c) 2018, 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

"use strict";

/**
 * Classic doubly-linked list.
 * See [Wikipedia](https://en.wikipedia.org/wiki/Doubly_linked_list) for
 * details
 * @template T
 * @implements Iterable<T>
 */
class DoublyLinkedList {
  /**
   * @param {DLLNode<T>} [first] head of the list, optional
   * @param {DLLNode<T>} [last] tail of the list, optional
   * @constructor
   */
  constructor(first = null, last = null) {
    this.first = first;
    this.last = last;
  }

  /**
   * Inserts a node after a given node
   * @param {DLLNode<T>} node the node in the original list
   * @param {DLLNode<T>} newNode the new node to add to the list
   * @return {DoublyLinkedList<T>} this
   */
  insertAfter(node, newNode) {
    newNode.prev = node;
    if (node.next === null) {
      // node is at the end
      newNode.next = null;
      this.last = newNode;
    } else {
      newNode.next = node.next;
      node.next.prev = newNode;
    }
    node.next = newNode;
    return this;
  }

  /**
   * Inserts a node before a given node
   * @param {DLLNode<T>} node the node in the original list
   * @param {DLLNode<T>} newNode the new node to add to the list
   * @return {DoublyLinkedList<T>} this
   */
  insertBefore(node, newNode) {
    newNode.next = node;
    if (node.prev === null) {
      // node is at the beginning
      newNode.prev = null;
      this.first = newNode;
    } else {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    }
    node.prev = newNode;

    return this;
  }

  /**
   * Inserts a node at the start of a possibly empty list
   * @param {DLLNode<T>} newNode the node to add
   * @return {DoublyLinkedList<T>} this
   */
  insertStart(newNode) {
    if (this.first === null) {
      // list is empty
      this.first = newNode;
      this.last = newNode;
      newNode.prev = null;
      newNode.next = null;
    } else {
      this.insertBefore(this.first, newNode);
    }

    return this;
  }

  /**
   * Inserts a node at the end of a possibly empty list
   * @param {DLLNode<T>} newNode the node to add
   * @return {DoublyLinkedList<T>} this
   */
  insertEnd(newNode) {
    if (this.last === null) {
      // list is empty
      this.insertStart(newNode);
    } else {
      this.insertAfter(this.last, newNode);
    }

    return this;
  }

  /**
   * Appends a node containing the elt to the end of this list
   * @param {T} elt
   */
  pushBack(elt) {
    this.insertEnd(new DLLNode(elt));
  }

  /**
   * Removes the first node from the list and returns the data it contains
   * @return {T} the contents of the first node
   */
  popFront() {
    const out = this.first.data;
    this.remove(this.first);
    return out;
  }

  /**
   * Removes a node from the list
   * @param {DLLNode<T>} node the node to remove
   * @return {DoublyLinkedList<T>} this
   */
  remove(node) {
    if (node.prev === null) {
      this.first = node.next;
    } else {
      node.prev.next = node.next;
    }
    if (node.next === null) {
      this.last = node.prev;
    } else {
      node.next.prev = node.prev;
    }

    return this;
  }

  /**
   * Generator function that implements iterator so you can do `for of` loops
   * on doubly linked lists
   * @return {IterableIterator<T>}
   */
  *[Symbol.iterator]() {
    let current = this.first;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }
}

/**
 * @template T
 */
class DLLNode {
  /**
   * @param {T} data the object in this location
   * @param {DLLNode<T>} [prev] the previous object in the list, optional
   * @param {DLLNode<T>} [next] the next object in the list, optional
   * @constructor
   */
  constructor(data, prev = null, next = null) {
    this.prev = prev;
    this.next = next;
    this.data = data;
  }
}
