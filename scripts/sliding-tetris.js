/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

/* globals */
var pieceCounter = 0;   // global counter to keep Piece IDs unique
var moves = 0;          // move counter
var difficulty = 1;     // difficulty level, based on score
const SQUARE_SIZE = 60; // square size in pixels
const B_HEIGHT = 10;    // board width in squares
const B_WIDTH = 8;      // board height in squares
var BOARD;              // 2D array for positions of existing Pieces
var P = {};             // holds existing Pieces
var score = 0;          // global for player's score
var clearedInARow = 0;  // global counter keeps track of multiple rows cleared
var needToAdd = 0;      // how many lines should be added once animations stop


/* Piece constructor */
const Piece = function(x = 0, y = 0, width = 1, height = 1) {
	// clean inputs
	width = (width > B_WIDTH) ? B_WIDTH : Math.floor(Math.abs(width));
	height = (height > B_HEIGHT) ? B_HEIGHT : Math.floor(Math.abs(height));

	if (x + width > B_WIDTH)
		x = B_WIDTH - width;
	else if (x < 0)
		x = 0;
	else
		x = Math.floor(Math.abs(x));

	if (y + height > B_HEIGHT)
		y = B_HEIGHT - height;
	else if (y < 0)
		y = 0;
	else
		y = Math.floor(Math.abs(y));

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = pieceCounter++;
	this.color = randColor();

};


/* Piece methods */
Piece.prototype = {
	/**
	 * creates a DOM element for this Piece and adds it to the board
	 *
	 * Returns the object so it can be chained.
	 **/
	add: function() {
		var $element = $('<div></div>', { 
			'id': 'piece-' + this.id,
			'class': 'piece',
			'css': {
				'height': 0,
				'width': SQUARE_SIZE * this.width + 'px',
				'left': this.x * SQUARE_SIZE,
				'top': (B_HEIGHT - this.y - this.height + 1) * SQUARE_SIZE,
				'background-color': this.color
			},
			'draggable': { snap: true,
				grid: [SQUARE_SIZE, SQUARE_SIZE],
				axis: 'x',
				containment: "parent",
				opacity: 0.75,
				stop: function() {
					// disable dragging while the animations are playing
					$('.piece').draggable('option', 'disabled', true);
					moves++;
					this.updatePositionByDOM();
					let m = (difficulty > 2) ? 2 : 3;
					if (moves % m == 0) {
						needToAdd += Math.round(Math.random() * 
							Math.min(difficulty, 3)) + 1;
					}
				}.bind(this),
				drag: function(event, ui) {
					// keep Pieces from overlapping
					this.useWalls(ui);
				}.bind(this)
			}
		});

		$('#board').append($element);
		moveUp($element, this.height);

		// update BOARD
		this.updatePosition();

		return this;
	},

	/**
	 * Helper function for JQuery UI's Draggable API to keep blocks from passing
	 * through each other. Called on Piece's drag event.
	 **/
	useWalls: function(ui) {
		let leftWall = 0;
		let rightWall = B_WIDTH;

		// find closest neighboring piece on the left
		for (let i = this.x - 1; i >= 0; --i) {
			if (BOARD[i][this.y] != -1) {
				leftWall = i + 1;
				break;
			}
		}

		// find closest neighboring piece on the right
		for (let i = this.x + this.width; i < B_WIDTH; ++i) {
			if (BOARD[i][this.y] != -1) {
				rightWall = i - this.width;
				break;
			}
		}

		// make sure the Piece being dragged doesn't cross left and rightwalls
		ui.position.left =
			Math.max(leftWall * SQUARE_SIZE, ui.position.left);
		ui.position.left =
			Math.min(rightWall * SQUARE_SIZE, ui.position.left);
	},
	
	/**
	 * Clears the old position of the Piece in BOARD.
	 *
	 * Returns the object so it can be chained
	 **/
	clearPosition: function() {
		for (let i = this.x; i < this.width + this.x; ++i) {
			for (let j = this.y; j < this.height + this.y; ++j) {
				BOARD[i][j] = -1;
			}
		}

		return this;
	},

	/**
	 * Sets the position of the Piece in BOARD.
	 *
	 * Returns the object so it can be chained
	 **/
	updatePosition: function() {
		for (let i = this.x; i < this.width + this.x; ++i) {
			for (let j = this.y; j < this.height + this.y; ++j) {
				BOARD[i][j] = this.id;
			}
		}

		return this;
	},

	/** 
	 * Sets the position of this Piece object in BOARD to be the same as the
	 * position of its corresponding DOM element. Then, it calls applyGravity()
	 * to all pieces on the board.
	 *
	 * Returns the object so it can be chained.
	 **/
	updatePositionByDOM: function() {
		// clear the original position
		this.clearPosition();

		// wait for the animation to finish (after 500 ms)
		setTimeout(function() {
			// find the new X coordinate
			this.x = $('#piece-' + this.id)
				.css('left').slice(0, -2) / SQUARE_SIZE;
			// update BOARD
			for (let i = this.x; i < this.x + this.width; ++i) {
				for (let j = this.y; j < this.y + this.height; ++j) {
					BOARD[i][j] = this.id
				}
			}
			
			// apply gravity to the entire board
			applyGravityAll();
		}.bind(this), 500);

		return this;
	},

	/**
	 * Checks to see if this piece has nothing directly underneath it. If so, it
	 * falls until it hits either another piece or the bottom of the board.
	 *
	 * Returns true if this object fell
	 **/
	applyGravity: function() {
		var canFall = true;
		var fell = false;
		while (this.y > 0 && canFall) {
			canFall = true;
			// check whether there are any Pieces directly below this one
			for (let i = this.x; i < this.x + this.width; ++i) {
				if (BOARD[i][this.y - 1] != -1) 
					canFall = false;
			}
			if (canFall) {
				// move down and update BOARD
				for (let i = this.x; i < this.x + this.width; ++i) {
					BOARD[i][this.y + this.height - 1] = -1;
					BOARD[i][this.y - 1] = this.id;
				}
				fell = true;
				this.y--;
			}
		}

		// move the DOM element
		$('#piece-' + this.id)
			.css('top', (B_HEIGHT - this.y - this.height) * SQUARE_SIZE);

		return fell;
	},

	/**
	 * Destroys this piece object and removes it from the board
	 **/
	destroy: function() {
		this.clearPosition();
		P[this.id] = undefined;
		$('#piece-' + this.id).remove();
	}
};


/**
 * Once the animations are done playing one turned has passed, so update the
 * move counter, check to see if you can clear any lines, and re-enable
 * dragging.
 **/
const turnDone = () => {
	$('#moves').html(moves);
	// check for clearable lines
	let line = -1;
	let cleared = false;
	for (let i = 0; i < B_HEIGHT; ++i) {
		line = i;
		for (let j = 0; j < B_WIDTH; ++j) {
			if (BOARD[j][i] == -1) {
				line = -1;
				break;
			}
		}
		if (line != -1) {
			clearLine(line);
			cleared = true;
		}
	}

	// if no lines were cleared we're done
	if (!cleared) {
		prepareForNextTurn();
	}
};


/**
 * Call when a turn has completed and all resulting animations have finished
 **/
const prepareForNextTurn = () => {
	if (clearedInARow > 0) {
		if (moves != 0)
			score += Math.pow(difficulty + 1, clearedInARow) * 10;
		clearedInARow = 0;
		if (moves < 8)
			difficulty = Math.max(difficulty, 1);
		else if (moves < 15)
			difficulty = Math.max(difficulty, 2);
		else if (moves < 22)
			difficulty = Math.max(difficulty, 3);
		else if (moves < 30)
			difficulty = Math.max(difficulty, 4);
		else
			difficulty = 5;
		$('#difficulty').html(difficulty);
	}
	$('#score').html(score);
	if ($('.piece').length == 0) {
		needToAdd++;
	}
	setTimeout(() => {
		clearedInARow = 0;
		if (needToAdd > 0) {
			addLine(difficulty, true);
			needToAdd--;
		}
		else {
			// check for win
			for (let i = 0; i < B_WIDTH; ++i) {
				if (BOARD[i].length > B_HEIGHT) {
					alert('You lose!');
					$('.piece').draggable('option', 'disabled', true);
					$('#addLineButton').prop('disabled', true);
					return;
				}
			}
			$('.piece').draggable('option', 'disabled', false);
		}
	}, 500);
}


/**
 * Clears a filled line
 **/
const clearLine = (n) => {
	$('.piece').draggable('option', 'disabled', true);
	// find blocks to clear
	let blocksToClear = {};
	for (let i = 0; i < B_WIDTH; ++i) {
		blocksToClear[BOARD[i][n]] = P[BOARD[i][n]];
	}
	for (p in blocksToClear) {
		// make pieces glow before they disappear
		if (blocksToClear[p]) {
			$('#piece-' + p).css({
				'background-color': 'white',
				'box-shadow': '0 0 10px 10px white',
				'z-index': 1
			});
		}
	}
	clearedInARow++;
	setTimeout(function() {
		for (p in blocksToClear) {
			// destroy each of the pieces to clear
			if (P[p])
				P[p].destroy();
		}
		// fall
		applyGravityAll();
	}, 1000);
};

/**
 * Adds a line to the bottom of the board, moving all other lines up.
 *
 * lvl: integer, the difficulty level of this line, from 1 to 5
 * force: boolean, force the add, even if dragging is disabled (this should only
 * be used if there are no Pieces on the board
 **/
const addLine = (lvl = 1, force = false) => {
	// don't go too fast
	if (!force && $('.piece').draggable('option', 'disabled')) {
		console.log('whoa, slow down!');
		return;
	}

	$('.piece').draggable('option', 'disabled', true);

	// probabilities of getting a block of each length. probs[0] = probability
	// of getting an empty space, probs[1] = probability of getting a block of
	// width 1, etc.
	let probs;
	switch (lvl) {
		case 1: probs = [.5, .3, .2, 0, 0]; break;
		case 2: probs = [.2, .2, .4, .2, 0]; break;
		case 3: probs = [.1, .3, .3, .2, .1]; break;
		case 4: probs = [.1, .3, .3, .15, .15]; break;
		case 5: probs = [0, .1, .3, .3, .3]; break;
		default: probs = [.5, .4, .1, 0, 0];
	}

	// we need to guarantee at least one space is empty to that the added line
	// doesn't immediately clear
	var forcedEmptyIndex = Math.floor(Math.random() * B_WIDTH);

	// generate blocks
	var roll, target, blockWidth;
	var blocksToAdd = {};
	// keep track of positions so blocks don't overlap
	var remPos = new Array(B_WIDTH);
	for (let r = 0; r < B_WIDTH; ++r) remPos[r] = -1;
	remPos[forcedEmptyIndex] = -2;
	var i = 0;
	outerloop: while (i < B_WIDTH) {
		blockWidth = 0;
		target = 0;

		// roll a length based on probs
		roll = Math.random();
		for (let j = 0; j <= 4; ++j) {
			if (roll < target + probs[j]) {
				blockWidth = j;
				break;
			} else {
				target += probs[j];
			}
		}

		// this space is empty
		if (blockWidth == 0 || i == forcedEmptyIndex) {
			++i;
			continue;
		}

		// check whether this would fit here
		innerloop: for (let j = i; j < i + blockWidth; ++j) {
			if (j >= B_WIDTH || remPos[j] != -1) {
				// doesn't fit
				++i;
				continue outerloop;
			}
		}

		// record this position for later
		for (let j = i; j < i + blockWidth - 1; ++j) {
			remPos[j] = 1;
		}
		var temp =  new Piece(i, 0, blockWidth);
		blocksToAdd[temp.id] = temp;
		i += blockWidth;
	}

	// move other blocks up
	for (let p in P) {
		// clear old positions
		if (P[p]) {
			P[p].clearPosition();
			P[p].y++;
		}
	}
	for (let p in P) {
		// put in new positions
		if (P[p]) {
			P[p].updatePosition();
			let newTop = Number($('#piece-' + P[p].id).css('top').slice(0, -2)) 
				- SQUARE_SIZE;
			$('#piece-' + P[p].id).css('top', newTop);
		}
	}

	// add blocksToAdd
	for (let b in blocksToAdd) {
		P[b] = blocksToAdd[b].add();
	}

	// apply gravity
	setTimeout(() => { applyGravityAll(); }, 501);
};


/**
 * Calls applyGravity() on all pieces on the board repeatedly until none fall or
 * there are no pieces left. Then it calls turnDone()
 **/
const applyGravityAll = () => {
	$('.piece').draggable('option', 'disabled', true);
	let piecesLeft = false;
	let fell = false;
	for (p in P) {
		if (P[p]) {
			piecesLeft = true;
			if (P[p].applyGravity())
				fell = true;
		}
	}
	if (fell && piecesLeft)
		applyGravityAll();
	else
		turnDone();
};


const addLineButton = () => {
	score -= 10 * difficulty;
	moves++;
	$('#moves').html(moves);
	$('#score').html(score);
	addLine(difficulty);
}


/**
 * Generates a random, bright HTML color
 *
 * Returns a string representing this color
 **/
const randColor = () => {
	const letters = '0123456789abcdef';
	let out = '#';
	for (let i = 0; i < 6; ++i) {
		out += letters[Math.floor(Math.random() * 14) + 2];
	}
	return out;
};


/**
 * Helper function for Piece.add(). Makes the height and top increase so the
 * animation looks smooth
 **/
const moveUp = function($el, height) {
	setTimeout(function() {
		$el.css('height', SQUARE_SIZE * height + 'px');
		$el.css('top', '-=' + SQUARE_SIZE);
	}, 1);
};
	

/**
 * Initializes the board
 **/
const init = () => {
	$('.piece').draggable('option', 'disabled', true);
	for (let i = 0; i < 8; ++i) {
		setTimeout(() => {
			addLine(5, true);
		}, 500);
	} 

	prepareForNextTurn();
};


/**
 * Set things up once the DOM is ready
 **/
$('document').ready(() => {
	// prepare board <div> element
	$('#board').css({ width: SQUARE_SIZE * B_WIDTH + 'px',
		height: SQUARE_SIZE * B_HEIGHT + 'px'
	});

	// prepare BOARD 2D array
	BOARD = new Array(B_WIDTH);
	for (let i = 0; i < B_WIDTH; ++i) {
		BOARD[i] = new Array(B_HEIGHT);
		for (let j = 0; j < B_HEIGHT; ++j) {
			BOARD[i][j] = -1;
		}
	}

	// prepare #moves and #stats
	$('#moves').html(moves);
	$('#stats').css('width', SQUARE_SIZE * B_WIDTH + 'px');
	$('#score').html(score);
	$('#difficulty').html(difficulty);

	init();
});
