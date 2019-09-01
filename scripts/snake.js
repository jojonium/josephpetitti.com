/* (c) 2018, 2019 Joseph Petitti | https://josephpetitti.com/license.txt */
"use strict";

/**
 * Enumerated type for directions
 * @enum {number}
 */
const dirsEnum = Object.freeze({ up: 1, right: 2, down: 3, left: 4 });

class Point {
  /**
   * @param {number} x x coordinate of this point
   * @param {number} y y coordinate of this point
   * @constructor
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SnakePoint extends Point {
  /**
   * creates a point representing a portion of a snake
   * @param {number} x x coordinate of this point
   * @param {number} y y coordinate of this point
   * @param {dirsEnum} dir
   * @constructor
   */
  constructor(x, y, dir) {
    super(x, y);
    this.dir = dir;
  }
}

class Board {
  /**
   * @param {number} w the width of the board, in cells
   * @param {number} h the height of the board, in cells
   * @param {number} s the size of each cell, in pixels
   * @constructor
   */
  constructor(w, h, s) {
    this.width = w;
    this.height = h;
    this.squareSize = s;

    // initialize snake
    this.snakeHead = new SnakePoint(
      Math.floor(this.width),
      Math.floor(this.height),
      dirsEnum.up
    );
    this.snakeTail = new SnakePoint(
      this.snakeHead.x,
      this.snakeHead.y,
      dirsEnum.up
    );
    /** @type Array<SnakePoint> */
    this.snakeBodies = [];

    // initialize score
    this.score = 1;

    // initialize fruit
    /** @type Array<Point> */
    this.fruits = [];
    // TODO placeFruit();

    // create the canvas
    const canvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.id = "canvas";
    canvas.width = this.width * this.squareSize;
    canvas.height = this.height * this.squareSize;

    // put the canvas into the DOM
    document.getElementById("canvas-holder").appendChild(canvas);
  }

  /**
   * finds an empty space on the board randomly and places a fruit there (adds
   * the point to this.fruits). If there are no empty spaces it does nothing.
   * @return {Board} this, so it can be chained
   */
  placeFruit() {
    if (this.score + this.fruits.length >= this.width * this.height) {
      // no empty spaces so just return without doing anything
      return this;
    }

    let occupied = true;
    let p;
    while (occupied) {
      // generate a random point
      p = new Point(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );

      // make sure this point isn't occupied by a snake
      for (const s of this.snakeBodies) {
        if (p.x === s.x && p.y === s.y) {
          occupied = true;
          break;
        }
      }
      if (!occupied) {
        // make sure this point isn't occupied by a fruit
        for (const f of this.fruits) {
          if (p.x === f.x && p.y === f.y) {
            occupied = true;
            break;
          }
        }
      }
    }

    // add the point to the fruits list
    this.fruits.push(p);

    return this;
  }
}
