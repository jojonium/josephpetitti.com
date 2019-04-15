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
	/* creates a DOM element for this Piece and adds it to the board */
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
				}.bind(this)
			}
		}));

		return this;
	},
	
	clearPosition: function() {
		for (let i = 0; i < this.width; ++i) {
			for (let j = 0; j < this.height; ++j) {
				BOARD[i + this.x][j + this.y] = -1;
			}
		}
	},

	updatePosition: function() {
		this.clearPosition();
		let testH = this.y + this.height;
		for (let i = this.x; i < this.x + this.width; ++i) {
			let found = false;
			while (testH < B_HEIGHT && !found) {
				if (BOARD[i][testH] >= 0) {
					P[BOARD[i][testH]].updatePosition();
					found = true;
					break;
				}
				testH++;
			}
		}
		setTimeout(function() {

			// fall due to gravity
			this.x = $('#piece-' + this.id)
					.css('left').slice(0, -2) / SQUARE_SIZE;
			let canFall = true;
			while (this.y > 0 && canFall) {
				canFall = true;
				for (let i = this.x; i < this.x + this.width; ++i) {
					if (BOARD[i][this.y - 1] != -1) 
						canFall = false;
				}
				if (canFall) {
					this.y--;
					$('#piece-' + this.id).css('top', 
							(B_HEIGHT - this.y - this.height) * SQUARE_SIZE);
				}
			}

			// update BOARD
			for (let i = 0; i < this.width; ++i) {
				for (let j = 0; j < this.height; ++j) {
					BOARD[i + this.x][j + this.y] = this.id
				}
			}
		}.bind(this), 500);

		return this;
	}
};


/* generates a random, bright HTML color */
const randColor = () => {
	const letters = '0123456789abcdef';
	let out = '#';
	for (let i = 0; i < 6; ++i) {
		out += letters[Math.floor(Math.random() * 14) + 2];
	}
	return out;
};


const init = () => {
	P[0] = new Piece().add();
	P[1] = new Piece(0, 1).add();
	P[2] = new Piece(0, 2, 3).add();
};


$('document').ready(() => {
	// prepare board
	$('#board').css({ width: SQUARE_SIZE * B_WIDTH + 'px',
		height: SQUARE_SIZE * B_HEIGHT + 'px'
	});
	BOARD = new Array(B_WIDTH);
	for (let i = 0; i < B_WIDTH; ++i) {
		BOARD[i] = new Array(B_HEIGHT);
		for (let j = 0; j < B_HEIGHT; ++j) {
			BOARD[i][j] = -1;
		}
	}
	init();
});
