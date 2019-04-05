/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// Global constants and variables
const SQUARE_SIZE = 100;
var configuration = 1;

var Piece = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Piece.prototype = {
	/*
	 * Moves the piece in a given direction on the board. Assumes the move
	 * is valid.
	 * direction: 0=up, 1=right, 2=down, 3=left
	 */
	move: function(direction) {
		if (direction == 0) { // up
			this.y--;
		} else if (direction == 1) { // right
			this.x++;
		} else if (direction == 2) { // down
			this.y++;
		} else if (direction == 3) {
			this.x--;
		}
	},

	/*
	 * returns true if this piece contains the given point, false otherwise
	 */
	containsPoint: function(x, y) {
		return (x >= this.x && y >= this.y && x < (this.x + this.w) &&
			y < (this.y + this.h));
	},

	/**
	 * Finds the x and y coordinates of the top left point in the piece, as
	 * well as the piece's width and height in a convenient array
	 * @return an array with the left, top, width, and height values
	 */
	getDims() {
		return [this.x, this.y, this.w, this.h];
	}
};

/*
 * Constructor for a Board object. pieces[0] MUST be the piece that needs to be
 * removed from the puzzle to win
 */
var Board = function(pieces) {
	this.pieces = pieces;
	this.selected = null;
	this.height = 5;
	this.width = 4;
	this.moves = 0;
}

Board.prototype = {
	/*
	 * Sets the selected piece as the piece at the given x and y coordinates
	 * @return true if a piece was selected, false otherwise
	 */
	selectPiece: function(x, y) {
		for (let i = 0; i < this.pieces.length; ++i) {
			if (this.pieces[i].containsPoint(x, y)) {
				this.selected = this.pieces[i];
				return true;
			}
		}

		// if we get here then they clicked on an empty square, so
		// deselect the current piece
		this.selected = null;
		return false;
	},

	/*
	 * Returns true if a piece is on a certain point, false otherwise
	 */
	isOccupied: function(x, y) {
		for (let i = 0; i < this.pieces.length; ++i) {
			if (this.pieces[i].containsPoint(x, y)) {
				return true;
			}
		}
		return false;
	},

	/*
	 * Tries to move the selected piece in a given direction.
	 * Also checks to for win condition
	 * Direction: 0=up, 1=right, 2=down, 3=left. Returns true if the move
	 * was successful, false otherwise
	 */
	movePiece: function(direction) {
		var i;

		// if there's no selected piece we can't move, so just return
		// false
		if (this.selected == null) {
			return false;
		}

		// check win
		if (this.selected === this.pieces[0] &&
			this.selected.x == 1 &&
			this.selected.y == 3 &&
			direction == 2) {
			$("#message").html("YOU WIN!");
			$("#play-again").show();
			return true;
		}

		// make sure the move is valid
		if (direction == 0) {
			// up
			if (this.selected.y == 0) return false; // ceiling
			for (i = this.selected.x;
				i < this.selected.x + this.selected.w; ++i) {
				if (this.isOccupied(i, this.selected.y - 1)) {
					// there's a piece blocking this one
					return false;
				}
			}
		} else if (direction == 1) {
			// right
			if (this.selected.x + this.selected.w == this.width)
				return false;
			for (i = this.selected.y; 
				i < this.selected.y + this.selected.h; ++i) {
				if (this.isOccupied(
					this.selected.x + this.selected.w, i)) {
					// there's a piece blocking this one
					return false;
				}
			}
		} else if (direction == 2) {
			// down
			if (this.selected.y + this.selected.h == this.height)
				return false;
			for (i = this.selected.x;
				i < this.selected.x + this.selected.w; ++i) {
				if (this.isOccupied(i,
					this.selected.y + this.selected.h)) {
					// there's a piece blocking this one
					return false;
				}
			}
		} else if (direction == 3) {
			// left
			if (this.selected.x == 0) return false;
			for (i = this.selected.y; 
				i < this.selected.y + this.selected.h; ++i) {
				if (this.isOccupied(this.selected.x - 1, i)) {
					// there's a piece blocking this one
					return false;
				}
			}
		}

		// if we've gotten here it means we're clear to move the piece
		this.selected.move(direction);
		++this.moves;
		gooey.updateMoves(this.moves);
		return true;
	}
};

var Point = function(x, y) {
	this.x = x;
	this.y = y;
};

var GUI = function(board) {
	this.canvas = document.createElement('canvas');
	this.board = board;
	this.canvas.id = 'canvas';
	this.canvas.width = SQUARE_SIZE * board.width;
	this.canvas.height = SQUARE_SIZE * board.height + 8;
	document.getElementById('canvas-holder').appendChild(this.canvas);
	this.ctx = canvas.getContext('2d');
	this.prevPoint = null;
}

GUI.prototype = {
	drawBoard: function() {
		this.ctx.fillStyle = "#005377";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.strokeStyle = "#f1a208";
		this.ctx.lineWidth = 6;
		this.ctx.beginPath();
		this.ctx.moveTo(SQUARE_SIZE, canvas.height - 3);
		this.ctx.lineTo(3 * SQUARE_SIZE, canvas.height - 3);
		this.ctx.stroke();
		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle = "#2b2b2b";
		for (let i = 0; i < this.board.pieces.length; ++i) {
			if (this.board.selected === this.board.pieces[i])
				this.ctx.fillStyle = "#3066be";
			else if (i == 0)
				this.ctx.fillStyle = "#f1a208";
			else
				this.ctx.fillStyle = "#4ea5d9";
			var tlx = this.board.pieces[i].getDims()[0];
			var tly = this.board.pieces[i].getDims()[1];
			var wid = this.board.pieces[i].getDims()[2];
			var hei = this.board.pieces[i].getDims()[3];
			this.ctx.beginPath();
			this.ctx.rect(tlx * SQUARE_SIZE + 5, 
				tly * SQUARE_SIZE + 5,
				wid * SQUARE_SIZE - 10, 
				hei * SQUARE_SIZE - 10);
		//	this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fillRect(tlx * SQUARE_SIZE + 5, 
				tly * SQUARE_SIZE + 5,
				wid * SQUARE_SIZE - 10, 
				hei * SQUARE_SIZE - 10);
		}
	},

	handleClick: function(e) {
		e.preventDefault();
		var x, y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		
		this.prevPoint = new Point(x, y);

		x = Math.floor(x / SQUARE_SIZE);
		y = Math.floor(y / SQUARE_SIZE);

		this.board.selectPiece(x, y);

		this.drawBoard();
	},

	handleUnclick: function(e) {
		e.preventDefault();
		var newX, newY;
		if (e.pageX || e.pageY) {
			newX = e.pageX;
			newY = e.pageY;
		} else {
			newX = e.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			newY = e.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		newX -= canvas.offsetLeft;
		newY -= canvas.offsetTop;

		var dx = newX - this.prevPoint.x;
		var dy = newY - this.prevPoint.y;
		if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
			// mouse dragged
			if (Math.abs(dx) > Math.abs(dy)) {
				// horizontal drag
				if (dx > 0) {
					this.board.movePiece(1);
				} else {
					this.board.movePiece(3);
				}
			} else {
				// vertical drag
				if (dy > 0) {
					this.board.movePiece(2);
				} else {
					this.board.movePiece(0);
				}
			}
		}

		this.drawBoard();
	},
		


	handleKey: function(e) {
		if (e.which == 87 || e.which == 38 || e.which == 75) {
			// up
			if (e.which == 38) e.preventDefault();
			this.board.movePiece(0);
		} else if (e.which == 68 || e.which == 39 || e.which == 76) {
			// right
			this.board.movePiece(1);
		} else if (e.which == 83 || e.which == 40 || e.which == 74) {
			// down
			if (e.which == 40) e.preventDefault();
			this.board.movePiece(2);
		} else if (e.which == 65 || e.which == 37 || e.which == 72) {
			//left
			this.board.movePiece(3);
		}

		this.drawBoard();
	},

	updateMoves: function(input) {
		$('#moves').html(input);
	}
};


var clickIt = function(e) { gooey.handleClick(e); };
var unclickIt = function(e) { gooey.handleUnclick(e); };
var hitKey = function(e) { gooey.handleKey(e); };


$(document).ready(function() { main(); });

var config = function(num) {
	configuration = num;
	$(".config").css("background-color", "#3066be");
	$("#config-" + num).css("background-color", "#f1a208");
	reset();
}

var genPieces = function(num) {
	var out = new Array(10);

	if (num == 1) {
		out[0] = new Piece(1, 0, 2, 2);
		out[1] = new Piece(0, 0, 1, 2);
		out[2] = new Piece(3, 0, 1, 2);
		out[3] = new Piece(0, 2, 1, 2);
		out[4] = new Piece(1, 2, 1, 1);
		out[5] = new Piece(2, 2, 1, 1);
		out[6] = new Piece(3, 2, 1, 2);
		out[7] = new Piece(1, 3, 1, 1);
		out[8] = new Piece(2, 3, 1, 1);
		out[9] = new Piece(1, 4, 2, 1);
	} else if (num == 2) {
		out[0] = new Piece(1, 0, 2, 2);
		out[1] = new Piece(0, 0, 1, 1);
		out[2] = new Piece(3, 0, 1, 1);
		out[3] = new Piece(0, 1, 1, 2);
		out[4] = new Piece(3, 1, 1, 2);
		out[5] = new Piece(1, 2, 1, 2);
		out[6] = new Piece(0, 3, 1, 1);
		out[7] = new Piece(3, 3, 1, 1);
		out[8] = new Piece(0, 4, 2, 1);
		out[9] = new Piece(2, 4, 2, 1);
	} else if (num == 3) {
		out[0] = new Piece(2, 1, 2, 2);
		out[1] = new Piece(0, 0, 1, 2);
		out[2] = new Piece(1, 0, 1, 1);
		out[3] = new Piece(2, 0, 1, 1);
		out[4] = new Piece(3, 0, 1, 1);
		out[5] = new Piece(1, 1, 1, 2);
		out[6] = new Piece(0, 2, 1, 2);
		out[7] = new Piece(1, 3, 2, 1);
		out[8] = new Piece(3, 3, 1, 1);
		out[9] = new Piece(2, 4, 2, 1);
	} else if (num == 4) {
		out[0] = new Piece(1, 0, 2, 2);
		out[1] = new Piece(0, 0, 1, 2);
		out[2] = new Piece(3, 0, 1, 2);
		out[3] = new Piece(0, 2, 1, 2);
		out[4] = new Piece(1, 2, 2, 1);
		out[5] = new Piece(3, 2, 1, 2);
		out[6] = new Piece(1, 3, 1, 1);
		out[7] = new Piece(2, 3, 1, 1);
		out[8] = new Piece(0, 4, 1, 1);
		out[9] = new Piece(3, 4, 1, 1);
	}

	return out;
};

var gooey;

var main = function() {
	// make the board
	var pieces = genPieces(configuration);

	var b = new Board(pieces);

	gooey = new GUI(b);

	// handle clicking on the canvas
	document.getElementById('canvas').addEventListener("mousedown",clickIt);
	document.getElementById('canvas').addEventListener("mouseup",unclickIt);
	document.addEventListener("keydown", hitKey);
	
	gooey.updateMoves(0);
	gooey.drawBoard();
};

var reset = function() {
	// remove the canvas
	document.getElementById('canvas')
		.removeEventListener("mousedown", clickIt);
	document.getElementById('canvas')
		.removeEventListener("mouseup", unclickIt);
	document.removeEventListener("keydown", hitKey);
	var canv = document.getElementById("canvas");
	canv.parentNode.removeChild(canv);


	// hide the message
	$("#message").html('');
	
	// hide the play again button
	$("#play-again").hide();

	// start over
	main();
};
