/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

/* globals */
var PIECE_COUNTER = 0;
const SQUARE_SIZE = 60;
const B_HEIGHT = 10;
const B_WIDTH = 8;
var BOARD;
var P = {};

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
	this.id = PIECE_COUNTER++;
	this.color = randColor();

	// update BOARD
	for (let i = 0; i < width; ++i) {
		for (let j = 0; j < height; ++j) {
			BOARD[i + x][j + y] = this.id;
		}
	}
};


Piece.prototype = {
	/**
	 * creates a DOM element for this Piece and adds it to the board
	 *
	 * Returns the object so it can be chained.
	 **/
	add: function() {
		$('#board').append( $('<div></div>', { 
			'id': 'piece-' + this.id,
			'class': 'piece',
			'css': {
				'height': SQUARE_SIZE * this.height + 'px',
				'width': SQUARE_SIZE * this.width + 'px',
				'left': this.x * SQUARE_SIZE,
				'top': (B_HEIGHT - this.y - this.height) * SQUARE_SIZE,
				'background-color': this.color
			},
			'draggable': { snap: true,
				grid: [SQUARE_SIZE, SQUARE_SIZE],
				axis: 'x',
				containment: "parent",
				opacity: 0.75,
				/*start: function() {
					this.clearPosition();
				}.bind(this),*/
				stop: function() {
					this.updatePosition();
				}.bind(this),
				drag: function(event, ui) {
					this.useWalls(ui);
				}.bind(this)
			}
		}));

		return this;
	},

	/**
	 * Helper function for JQuery UI's Draggable API to keep blocks from passing
	 * through each other. Called on Piece's drag event.
	 **/
	useWalls: function(ui) {
		let leftWall = 0;
		let rightWall = B_WIDTH;
		for (let i = this.x - 1; i >= 0; --i) {
			if (BOARD[i][this.y] != -1) {
				leftWall = i + 1;
				break;
			}
		}
		for (let i = this.x + this.width; i < B_WIDTH; ++i) {
			if (BOARD[i][this.y] != -1) {
				rightWall = i - this.width;
				break;
			}
		}
		ui.position.left =
			Math.max(leftWall * SQUARE_SIZE, ui.position.left);
		ui.position.left =
			Math.min(rightWall * SQUARE_SIZE, ui.position.left);
	},
	
	/**
	 * Clears the old position of the Piece in BOARD.
	 *
	 * Returns the object so it can be changed
	 **/
	clearPosition: function() {
		for (let i = this.x; i < this.width + this.x; ++i) {
			for (let j = this.y; j < this.height + this.y; ++j) {
				BOARD[i][j] = -1;
			}
		}
	},

	/** 
	 * Sets the position of this Piece object in BOARD to be the same as the
	 * position of its corresponding DOM element. Then, it calls applyGravity()
	 * to all pieces on the board.
	 *
	 * Returns the object so it can be chained.
	 **/
	updatePosition: function() {
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
			for (let i = this.x; i < this.x + this.width; ++i) {
				if (BOARD[i][this.y - 1] != -1) 
					canFall = false;
			}
			if (canFall) {
				for (let i = this.x; i < this.x + this.width; ++i) {
					BOARD[i][this.y + this.height - 1] = -1;
					BOARD[i][this.y - 1] = this.id;
				}
				fell = true;
				this.y--;
			}
		}
		$('#piece-' + this.id)
			.css('top', (B_HEIGHT - this.y - this.height) * SQUARE_SIZE);

		return fell;
	}
};


const applyGravityAll = () => {
	let fell = false;
	for (p in P) {
		if (P[p].applyGravity())
			fell = true;
	}
	if (fell)
		applyGravityAll();
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
 * Initializes the board
 **/
const init = () => {
	P[0] = new Piece().add();
	P[1] = new Piece(0, 1).add();
	P[2] = new Piece(0, 2, 3).add();
	P[3] = new Piece(2, 3, 3).add();
	P[4] = new Piece(0, 3, 1).add();
	P[5] = new Piece(5, 0, 1).add();
};


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

	init();
});
