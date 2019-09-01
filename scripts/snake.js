/* (c) 2018, 2019 Joseph Petitti | https://josephpetitti.com/license.txt */
"use strict";

/**
 * Enumerated type for directions
 * @typedef {number} Direction
 * @enum {Direction}
 */
const dirsEnum = Object.freeze({
  up: 1,
  right: 2,
  down: 3,
  left: 4,
  upRight: 5,
  downRight: 6,
  downLeft: 7,
  upLeft: 8
});

/**
 * This is basically a magic number table that can be used to look up turn
 * directions. Use like `turnTable[nextDirection][previousDirection]`
 */
const turnTable = [[1, 8, 0, 5], [6, 2, 5, 0], [0, 7, 3, 6], [7, 0, 8, 4]];

/**
 * Returns the number of radians you need to rotate an image from pointing up
 * @param {Direction} dir the direction of a snake part
 * @return {number} the amount of rotation needed in radians
 */
const dirToRad = dir => ((dir - 1) * Math.PI) / 2;

class Point {
  /**
   * Represents a single point on the board
   * @param {number} x x coordinate of this point
   * @param {number} y y coordinate of this point
   * @constructor
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class FruitPoint extends Point {
  /**
   *
   * @param {number} x x coordinate of this fruit
   * @param {number} y y coordinate of this fruit
   * @param {string} [color] color of this fruit
   */
  constructor(x, y, color = "red") {
    super(x, y);
    this.color = color;
  }
}

class SnakePoint extends FruitPoint {
  /**
   * creates a point representing a portion of a snake
   * @param {number} x x coordinate of this point
   * @param {number} y y coordinate of this point
   * @param {string} color the color of this snake segment
   * @param {Direction} dir
   * @constructor
   */
  constructor(x, y, color, dir) {
    super(x, y, color);
    this.dir = dir;
  }
}

class Board {
  /**
   * @param {number} [w] the width of the board, in cells
   * @param {number} [h] the height of the board, in cells
   * @param {number} [s] the size of each cell, in pixels
   * @param {number} [gap] the amount of space between drawn cells, in pixels
   * @constructor
   */
  constructor(w = 10, h = 10, s = 50, gap = 3) {
    this.width = w;
    this.height = h;
    this.squareSize = s;
    this.gapSize = gap;

    // initialize snake
    this.snakeHead = new SnakePoint(
      Math.floor(this.width / 2),
      Math.floor(this.height / 2),
      "red",
      dirsEnum.down
    );
    this.snakeTail = null;

    /** @type Array<SnakePoint> */
    this.snakeBodies = [
      // TODO reset to []
      new SnakePoint(
        Math.floor(this.width / 2),
        Math.floor(this.height / 2) - 1,
        "blue",
        dirsEnum.down
      ),
      new SnakePoint(
        Math.floor(this.width / 2),
        Math.floor(this.height / 2) - 2,
        "green",
        dirsEnum.downLeft
      )
    ];

    // initialize score
    this.score = 3; // TODO reset to 1

    // initialize fruit
    /** @type Array<FruitPoint> */
    this.fruits = [];
    this.placeFruit();

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
    genPointLoop: while (occupied) {
      occupied = false;
      // generate a random point
      p = new FruitPoint(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );

      // make sure this point isn't occupied by a snake
      if (
        (p.x === this.snakeHead.x && p.y === this.snakeHead.y) ||
        (this.snakeTail && p.x === this.snakeTail.x && p.y === this.snakeTail.y)
      ) {
        occupied = true;
      }
      if (!occupied) {
        for (const s of this.snakeBodies) {
          if (p.x === s.x && p.y === s.y) {
            occupied = true;
            continue genPointLoop;
          }
        }
      }
      if (!occupied) {
        // make sure this point isn't occupied by a fruit
        for (const f of this.fruits) {
          if (p.x === f.x && p.y === f.y) {
            occupied = true;
            continue genPointLoop;
          }
        }
      }
    }

    p.color =
      "rgb(" +
      Math.floor(Math.random() * 200) +
      ", " +
      Math.floor(Math.random() * 200) +
      ", " +
      Math.floor(Math.random() * 200) +
      ")";
    // add the point to the fruits list
    this.fruits.push(p);

    return this;
  }

  /**
   * Draws a single frame, including the background, fruits, and snake
   * @return {Board} this, so it can be chained
   */
  drawFrame() {
    // draw background
    this.drawBackground();

    // draw fruit
    this.fruits.map(f => {
      this.drawFruit(f);
    });

    // draw snake
    this.drawSnakeHead().drawSnakeBody();

    return this;
  }

  /**
   * draws an image in cell x, y rotated by the given amount of radians and
   * blended with the given color
   * @param {number} x x coordinate of the cell to draw in
   * @param {number} y y coordinate of the cell to draw in
   * @param {string} id the ID of the HTML img element containing the image
   * @param {Direction} dir the direction the image should be facing
   * @param {string} [color] the color to blend with the image
   * @return {Board} this, so it can be chained
   */
  drawImage(x, y, id, dir = dirsEnum.up, color = "red") {
    // grab image from the DOM
    const img = /** @type {HTMLImageElement} */ (document.getElementById(id));

    // make temp canvas to do the rotation and blend operations
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.squareSize;
    tempCanvas.height = this.squareSize;
    const tempCtx = tempCanvas.getContext("2d");

    // rotate the temp canvas, draw the image, then rotate back
    const angle = dirToRad(dir);
    tempCtx.fillStyle = color;
    const center = this.squareSize * 0.5;
    // rotate() rotates around the canvas origin by default, so we translate the
    // origin to the center of the canvas
    tempCtx.translate(center, center);
    tempCtx.rotate(angle);
    tempCtx.translate(-center, -center); // reset the translation
    tempCtx.drawImage(
      img,
      this.gapSize,
      this.gapSize,
      this.squareSize - this.gapSize - this.gapSize,
      this.squareSize - this.gapSize - this.gapSize
    );
    // we have to translate again to rotate back
    tempCtx.translate(center, center);
    tempCtx.rotate(-angle);
    tempCtx.translate(-center, -center);

    // blend with the color
    tempCtx.globalCompositeOperation = "source-atop";
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, this.squareSize, this.squareSize);
    tempCtx.globalCompositeOperation = "source-in";
    tempCtx.drawImage(tempCanvas, 0, 0);

    // convert tempCanvas to bitmap and draw it into the normal canvas
    const coloredImage = new Image();
    coloredImage.src = tempCanvas.toDataURL("image/png");
    this.ctx.save();
    this.ctx.drawImage(coloredImage, x * this.squareSize, y * this.squareSize);
    this.ctx.restore();
    return this;
  }

  /**
   * Draws the head of the snake on the canvas
   * @return {Board} this, so it can be chained
   */
  drawSnakeHead() {
    // TODO make this look better
    // draw the face with the right color
    this.drawImage(
      this.snakeHead.x,
      this.snakeHead.y,
      "snake-head",
      this.snakeHead.dir,
      this.snakeHead.color
    );
    // draw the eyes yellow
    this.drawImage(
      this.snakeHead.x,
      this.snakeHead.y,
      "snake-head-eyes",
      this.snakeHead.dir,
      "yellow"
    );
    return this;
  }

  drawSnakeBody() {
    // TODO make this look better
    // draw each segment with the right color
    this.snakeBodies.map(s => {
      let imgID = "snake-segment";
      if (s.dir > dirsEnum.left) {
        imgID = "snake-segment-turning";
      }
      this.drawImage(s.x, s.y, imgID, s.dir, s.color);
    });
  }

  /**
   * draws the background on the canvas object
   * @return {Board} this, so it can be chained
   */
  drawBackground() {
    // TODO make this look better
    this.ctx.save();
    this.ctx.fillStyle = "#999999";
    this.ctx.fillRect(
      0,
      0,
      this.width * this.squareSize,
      this.height * this.squareSize
    );
    this.ctx.restore();

    return this;
  }

  /**
   * Draws a fruit
   * @param {FruitPoint} p the fruit to draw
   * @return {Board} this, so it can be chained
   */
  drawFruit(p) {
    // TODO make this look better
    this.ctx.fillStyle = p.color;
    this.ctx.strokeStyle = "black";

    this.ctx.lineWidth = 2;

    const centerX = (p.x + 0.5) * this.squareSize;
    const centerY = (p.y + 0.5) * this.squareSize;
    const radius = (this.squareSize - 2 * this.gapSize) / 2;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.stroke();

    return this;
  }

  slither() {
    // see if the snake is on top of a fruit, if so it eats it
    let ate = false;
    let newColor = this.snakeHead.color;
    // iterate backwards through fruits so we can remove one while traversing
    for (let i = this.fruits.length - 1; i >= 0; --i) {
      if (
        this.fruits[i].x === this.snakeHead.x &&
        this.fruits[i].y === this.snakeHead.y
      ) {
        this.score++; // add a score for eating it
        newColor = this.fruits[i].color; // remember the color for later
        this.fruits.splice(i, 1); // remove this fruit from reality
        ate = true; // remember that we just ate
        break; // there can only be one fruit per space (hopefully)
      }
    }

    // by default keep moving in the same direction
    let nextDirection = this.snakeHead.dir;
    // get the next move from the moveQueue if possible
    if (moveQueue.length > 0) {
      const nextInput = moveQueue.pop();
      // snakes can't turn 180 degrees in one slither, so only set the input as
      // the next direction if the snake is moving normally
      if (!(nextInput % 2 === nextDirection % 2)) {
        nextDirection = nextInput;
      }
    }

    // the old head point now becomes a body as the snake moves on
    // set the new direction of that point by looking it up in the turnTable
    this.snakeHead.dir = turnTable[nextDirection][this.snakeHead.dir];
    if (this.snakeHead.dir === 0) {
      // this should never happen
      throw new Error("Snake turned 180 degrees or something");
    }
    // add the old snakeHead to the snakeBody list
    this.snakeBodies.push(this.snakeHead);
    // make new snake head with new direction
    let newX = this.snakeHead.x;
    let newY = this.snakeHead.y;
    switch (nextDirection) {
      case dirsEnum.up:
        --newY;
        break;
      case dirsEnum.right:
        ++newX;
        break;
      case dirsEnum.down:
        ++newY;
        break;
      case dirsEnum.left:
        --newX;
        break;
    }
    this.snakeHead = new SnakePoint(newX, newY, newColor, nextDirection);


  }
}

// initialize moveQueue as a global so it persists beyond the board
const moveQueue = [dirsEnum.up];

// add event listeners to all keys
document.addEventListener("keydown", e => {
  if (e.which == 87 || e.which == 38 || e.which == 75) {
    // up
    if (e.which == 38) e.preventDefault(); // prevent arrow key default
    moveQueue.unshift(dirsEnum.up);
  } else if (e.which == 68 || e.which == 39 || e.which == 76) {
    // right
    moveQueue.unshift(dirsEnum.right);
  } else if (e.which == 83 || e.which == 40 || e.which == 74) {
    // down
    if (e.which == 40) e.preventDefault(); // prevent arrow key default
    moveQueue.unshift(dirsEnum.down);
  } else if (e.which == 65 || e.which == 37 || e.which == 72) {
    //left
    moveQueue.unshift(dirsEnum.left);
  } else if (e.which == 32) {
    // pause
    e.preventDefault();
    // TODO implement pause
  } else if (e.which == 82) {
    // restart
    e.preventDefault();
    // TODO implement reset
  }
  // delete last move if longer than 2
  if (moveQueue.length > 3) moveQueue.pop();
});

const b = new Board(10, 10, 40, 2);
setInterval(() => {
  b.drawFrame().placeFruit();
}, 400);
