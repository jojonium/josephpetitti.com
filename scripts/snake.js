/* (c) 2018, 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

"use strict";

const imgIDs = [
  "snake-head",
  "snake-head-eyes",
  "snake-segment",
  "snake-segment-turning",
  "snake-tail"
];

let imgCache, gWidth, gHeight, gSquareSize, gGapSize, BOARD;

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
  upToRight: 5,
  downToRight: 6,
  downToLeft: 7,
  upToLeft: 8,
  rightToUp: 9,
  rightToDown: 10,
  leftToDown: 11,
  leftToUp: 12
});

/**
 * This is basically a magic number table that can be used to look up turn
 * directions. Use like `turnTable[nextDirection - 1][previousDirection - 1]`
 */
const turnTable = [[1, 12, 0, 9], [6, 2, 5, 0], [0, 11, 3, 10], [7, 0, 8, 4]];

/**
 * Another magic number table, this time used to look up tail positions. Use
 * like `tailTable[oldDirection - 1]`
 */
const tailTable = [1, 2, 3, 4, 2, 2, 4, 4, 1, 3, 3, 1];

// initialize as globals so they persist beyond the board
let moveQueue = [dirsEnum.up];
let paused = true;
let lost = false;

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
   * Represents a point with a fruit in it
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
    /** @type {HTMLCanvasElement} */
    this.bodyCanvas = null;
  }
}

class BgAnimation {
  /**
   * @param {string} newColor color to change the background to
   * @param {number} x the x coordinate where the animation starts
   * @param {number} y the y coordinate where the animation starts
   * @param {number} [duration] how long the animation should last in
   * milliseconds
   * @constructor
   */
  constructor(newColor, x, y, duration = 1000) {
    this.newColor = newColor;
    this.duration = duration;
    this.x = x;
    this.y = y;
    this.startTime = new Date().valueOf();
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
      dirsEnum.up
    );

    /** @type {SnakePoint} */
    this.snakeTail = null;

    /** @type DoublyLinkedList<SnakePoint> */
    this.snakeBodies = new DoublyLinkedList();

    // initialize score
    this.score = 1;

    // initialize fruit
    /** @type Array<FruitPoint> */
    this.fruits = [];
    this.placeFruit();

    // initialize background colors
    this.bgColor = "#bbbbbb";
    /** @type {Array<BgAnimation>} */
    this.bgAnimations = [];

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
      "hsl(" +
      Math.floor(Math.random() * 360) +
      ", " +
      (80 + Math.floor(Math.random() * 20)) +
      "%, " +
      (20 + Math.floor(Math.random() * 80)) +
      "%)";
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

    // draw snake head and body
    this.drawSnakeHead().drawSnakeBody();

    // draw tail if it exists
    if (this.snakeTail) {
      this.drawSnakeTail();
    }

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
   * @return {HTMLCanvasElement} the temp canvas with the image drawn in it
   */
  drawImage(x, y, id, dir = dirsEnum.up, color = "red") {
    // get the right image from the cache
    /** @type {HTMLCanvasElement} */
    const tempCanvas = imgCache[id][(dir - 1) % 4];
    const tempCtx = tempCanvas.getContext("2d");

    // blend with the color
    tempCtx.globalCompositeOperation = "source-in";
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, this.squareSize, this.squareSize);

    // convert tempCanvas to bitmap and draw it into the normal canvas
    this.ctx.drawImage(tempCanvas, x * this.squareSize, y * this.squareSize);
    return tempCanvas;
  }

  /**
   * Draws the head of the snake on the canvas
   * @return {Board} this, so it can be chained
   */
  drawSnakeHead() {
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
    // draw each segment with the right color
    for (const b of this.snakeBodies) {
      if (b.bodyCanvas === null) {
        // create a cached canvas for this SnakePoint if it doesn't have one
        b.bodyCanvas = document.createElement('canvas');
        b.bodyCanvas.width = this.squareSize;
        b.bodyCanvas.height = this.squareSize;
        const tempCtx = b.bodyCanvas.getContext("2d");

        // draw the uncolored image in
        let imgID = "snake-segment";
        if (b.dir > dirsEnum.left) {
          imgID = "snake-segment-turning";
        }
        tempCtx.drawImage(imgCache[imgID][(b.dir - 1) % 4], 0, 0);

        // blend with color
        tempCtx.globalCompositeOperation = "source-in";
        tempCtx.fillStyle = b.color;
        tempCtx.fillRect(0, 0, this.squareSize, this.squareSize);
      }
      // draw the cached image into the real canvas
      this.ctx.drawImage(b.bodyCanvas, b.x * this.squareSize, b.y * this.squareSize);
    }
  }

  /**
   * Assumes that snakeTail exists and draws it on the canvas
   * @return {Board} this, so it can be chained
   */
  drawSnakeTail() {
    this.drawImage(
      this.snakeTail.x,
      this.snakeTail.y,
      "snake-tail",
      this.snakeTail.dir,
      this.snakeTail.color
    );

    return this;
  }

  /**
   * draws the background on the canvas object
   * @return {Board} this, so it can be chained
   */
  drawBackground() {
    this.ctx.save();

    // fill in the background with the default color behind all the animations
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(
      0,
      0,
      this.width * this.squareSize,
      this.height * this.squareSize
    );

    // animate a frame for each of the animations
    // TODO known bug: if one animation starts and finishes while another is
    // overall background color will be messed up
    for (let i = this.bgAnimations.length - 1; i >= 0; --i) {
      let delta =
        (new Date().valueOf() - this.bgAnimations[i].startTime) /
        this.bgAnimations[i].duration;

      this.ctx.fillStyle = this.bgAnimations[i].newColor;
      this.ctx.beginPath();
      this.ctx.arc(
        (this.bgAnimations[i].x + 0.5) * this.squareSize,
        (this.bgAnimations[i].y + 0.5) * this.squareSize,
        Math.sqrt(this.width * this.width + this.height * this.height) *
          this.squareSize *
          delta,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fill();

      //remove the animation if its time is up
      if (delta >= 1) {
        this.bgColor = this.bgAnimations[i].newColor;
        this.bgAnimations.splice(i, 1);
      }
    }

    this.ctx.restore();

    return this;
  }

  /**
   * Draws a fruit
   * @param {FruitPoint} p the fruit to draw
   * @return {Board} this, so it can be chained
   */
  drawFruit(p) {
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

  /**
   * Moves the snake forward one unit based on the directions in moveQueue.
   * Handles eating if the snake is on top of a fruit when it's called,
   * including growing the snake if necessary
   * @return {boolean} true if the snake ate, false otherwise
   */
  slither() {
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
    this.snakeHead.dir = turnTable[nextDirection - 1][this.snakeHead.dir - 1];
    if (this.snakeHead.dir === 0) {
      // this should never happen
      throw new Error("Snake turned 180 degrees or something");
    }
    // add the old snakeHead to the snakeBody list
    if (this.score > 1) {
      // cover edge case of one-unit snake
      this.snakeBodies.pushBack(this.snakeHead);
    }
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
    // see if the snake is on top of a fruit, if so it eats it
    let ate = false;
    let newColor = this.snakeHead.color;
    // iterate backwards through fruits so we can remove one while traversing
    for (let i = this.fruits.length - 1; i >= 0; --i) {
      if (this.fruits[i].x === newX && this.fruits[i].y === newY) {
        // add animation starting where the fruit was
        // get a new color that kind of matches the old one
        const toks = this.fruits[i].color.replace(/[)(hsl% ]/g, "").split(",");
        const newBgColor =
          "hsl(" +
          toks[0] +
          ", " +
          (+toks[1] - 50) +
          "%, " +
          Math.max(+toks[2] - 50, 20) +
          "%)";
        // add a bit of randomness to the animation duration
        let dur = Math.pow(Math.random() * 30 + 10, 2) + 400;
        // don't let an animation start and finish while another one is still
        // playing, because it would cause a bug with how the background is drawn
        if (this.bgAnimations.length > 0) {
          dur = Math.max(dur, this.bgAnimations[0].duration);
        }
        this.bgAnimations.unshift(
          new BgAnimation(
            newBgColor,
            this.fruits[i].x,
            this.fruits[i].y,
            dur
          )
        );
        this.score++; // add a score for eating it
        newColor = this.fruits[i].color; // remember the color for later
        this.fruits.splice(i, 1); // remove this fruit from reality
        ate = true; // remember that we just ate
        break; // there can only be one fruit per space (hopefully)
      }
    }

    this.snakeHead = new SnakePoint(newX, newY, newColor, nextDirection);

    // if we ate the tail stays the same so the snake grows
    if (!ate || this.score === 2) {
      // the first point in snakeBodies becomes the new tail
      if (this.snakeBodies.first !== null) {
        this.snakeTail = this.snakeBodies.first.data;
        this.snakeTail.dir = tailTable[this.snakeTail.dir - 1];
        this.snakeBodies.remove(this.snakeBodies.first);
      }
    }

    return ate;
  }

  step() {
    if (!lost && !paused) {
      // slither forward
      const ate = this.slither();

      // update score
      document.getElementById("score").innerHTML = "Score: " + this.score;

      // check to see if you've won
      if (this.score >= this.width * this.height) {
        alert("You win!");
        lost = true;
      }

      // check to see if you've gone out of bounds
      if (
        // out of bounds
        this.snakeHead.x >= this.width ||
        this.snakeHead.y >= this.height ||
        this.snakeHead.x < 0 ||
        this.snakeHead.y < 0
      ) {
        lost = true;
        document.getElementById("score").innerHTML =
          "Score: " + this.score + " &mdash; You lost by hitting a wall";
        document.getElementById("play-again").style.display = "block";
        return this;
      }

      // check to see if you've hit yourself
      if (
        this.snakeTail &&
        this.snakeTail.x === this.snakeHead.x &&
        this.snakeTail.y === this.snakeHead.y
      ) {
        lost = true;
        document.getElementById("score").innerHTML =
          "Score: " + this.score + " &mdash; You lost by hitting your tail";
        document.getElementById("play-again").style.display = "block";
        return this;
      }
      for (const s of this.snakeBodies) {
        if (this.snakeHead.x === s.x && this.snakeHead.y === s.y) {
          lost = true;
          document.getElementById("score").innerHTML =
            "Score: " + this.score + " &mdash; You lost by hitting your body";
          document.getElementById("play-again").style.display = "block";
          return this;
        }
      }
      if (ate) {
        this.placeFruit();
      }
    }
  }
}

/**
 * Creates a copy of each image that has an ID listed in imgIDs for each of the
 * four possible rotations and saves them in a global object so they don't have
 * to be recalculated every time. Access the imgCache object like
 * `imgcache[imgID][dir - 1]`
 * @param {number} ss squareSize, the total width of the image to cache
 * @param {number} gs gapSize, the amount of space that should be left blank at
 * the edges
 * @return {{}} the imgCache object
 */
const cacheImages = (ss, gs) => {
  let imgCache = {};
  for (const iid of imgIDs) {
    imgCache[iid] = new Array(4);
    for (let i = 0; i < 4; ++i) {
      const img = /** @type {HTMLImageElement} */ (document.getElementById(
        iid
      ));

      // make temp canvas to do the rotation operations
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = ss;
      tempCanvas.height = ss;
      const tempCtx = tempCanvas.getContext("2d");

      // rotate the temp canvas, draw the image, then rotate back
      const angle = (i * Math.PI) / 2;
      const center = ss * 0.5;
      // rotate() rotates around the canvas origin by default, so we translate the
      // origin to the center of the canvas
      tempCtx.translate(center, center);
      tempCtx.rotate(angle);
      tempCtx.translate(-center, -center); // reset the translation
      tempCtx.drawImage(img, gs, gs, ss - gs - gs, ss - gs - gs);
      // we have to translate again to rotate back
      tempCtx.translate(center, center);
      tempCtx.rotate(-angle);
      tempCtx.translate(-center, -center);

      // store this canvas object in a global object for later
      imgCache[iid][i] = tempCanvas;
    }
  }
  return imgCache;
};

/**
 * Sets up globals, caches images, and makes the board
 * @param {number} [w] input width of board in cells, optional
 * @param {number} [h] input height of board in cells, optional
 */
const setup = (w = 10, h = 10) => {
  lost = false;
  paused = true;
  document.getElementById("play-again").style.display = "none";
  // set squareSize big enough to fill the body well
  gSquareSize = Math.floor(
    document.getElementById("main").clientWidth / (w * 1.15)
  );
  moveQueue = [dirsEnum.up];
  // set other globals
  gWidth = w;
  gHeight = h;
  gGapSize = Math.ceil(gSquareSize / 30);
  imgCache = cacheImages(gSquareSize, gGapSize);
  // remove the existing canvas if there is one
  const existingCanvas = document.getElementById("canvas");
  if (existingCanvas) existingCanvas.remove();
  BOARD = new Board(gWidth, gHeight, gSquareSize, gGapSize);
};

/**
 * Resets the board, or sets up the default one if the board doesn't exist
 */
const reset = () => {
  document.getElementById("play-again").style.display = "none";
  paused = true;
  lost = false;
  // reset the board
  if (!BOARD) {
    setup();
  } else {
    document.getElementById("canvas").remove();
    moveQueue = [dirsEnum.up];
    BOARD = new Board(gWidth, gHeight, gSquareSize, gGapSize);
  }
};

// add event listeners to all keys
document.addEventListener("keydown", e => {
  if (e.which == 87 || e.which == 38 || e.which == 75) {
    // up
    if (e.which == 38) e.preventDefault(); // prevent arrow key default
    paused = false;
    moveQueue.unshift(dirsEnum.up);
  } else if (e.which == 68 || e.which == 39 || e.which == 76) {
    // right
    if (e.which == 39) e.preventDefault(); // prevent arrow key default
    paused = false;
    moveQueue.unshift(dirsEnum.right);
  } else if (e.which == 83 || e.which == 40 || e.which == 74) {
    // down
    if (e.which == 40) e.preventDefault(); // prevent arrow key default
    paused = false;
    moveQueue.unshift(dirsEnum.down);
  } else if (e.which == 65 || e.which == 37 || e.which == 72) {
    //left
    paused = false;
    if (e.which == 37) e.preventDefault(); // prevent arrow key default
    moveQueue.unshift(dirsEnum.left);
  } else if (e.which == 32) {
    // pause
    e.preventDefault();
    paused = !paused;
  } else if (e.which == 82) {
    // restart
    e.preventDefault();
    reset();
  }

  // delete last move if longer than 2
  if (moveQueue.length > 3) moveQueue.pop();
});

// add listeners to the buttons
document.getElementById("small").addEventListener("click", () => {
  setup(10, 10);
});
document.getElementById("medium").addEventListener("click", () => {
  setup(15, 15);
});
document.getElementById("large").addEventListener("click", () => {
  setup(25, 20);
});
document.getElementById("huge").addEventListener("click", () => {
  setup(30, 30);
});
document.getElementById("custom").addEventListener("click", () => {
  const iw =
    /** @type {HTMLInputElement} */
    (document.getElementById("input-width"));
  const ih =
    /** @type {HTMLInputElement} */
    (document.getElementById("input-height"));
  setup(iw.valueAsNumber, ih.valueAsNumber);
});
document.getElementById("play-again").addEventListener("click", reset);

function update() {
  if (BOARD) {
    BOARD.drawFrame();
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

setInterval(() => {
  if (BOARD) {
    BOARD.step();
  }
}, 100);
