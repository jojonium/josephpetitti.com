/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// Global constants
const SQUARE_SIZE = 100;

var Piece = function(points) {
		this.points = points;
}

Piece.prototype = {
	/*
	 * Moves the piece in a given direction on the board. Assumes the move
	 * is valid.
	 * direction: 0=up, 1=right, 2=down, 3=left
	 */
	move: function(direction) {
		if (direction == 0) { // up
			for (let i = 0; i < this.points.length; ++i)
				this.points[i].y--;
		} else if (direction == 1) { // right
			for (let i = 0; i < this.points.length; ++i)
				this.points[i].x++;
		} else if (direction == 2) { // down
			for (let i = 0; i < this.points.length; ++i)
				this.points[i].y++;
		} else if (direction == 3) {
			for (let i = 0; i < this.points.length; ++i)
				this.points[i].x--;
		}
	},

	/*
	 * returns true if this piece contains the given point, false otherwise
	 */
	containsPoint: function(x, y) {
		for (let i = 0; i < this.points.length; ++i) {
			if (this.points[i].x == x && this.points[i].y == y)
				return true;
		}
		return false;
	},

	/*
	 * returns the x and y coordinates of the top-left-most point in the
	 * piece
	 */
	getTopLeft: function() {
		var outx = this.points[0].x;
		var outy = this.points[0].y;
		for (let i = 1; i < this.points.length; ++i) {
			if (this.points[i].x < outx)
				outx = this.points[i].x;
			if (this.points[i].y < outy)
				outy = this.points[i].y;
		}

		return new Point(outx, outy);
	},
	
	/*
	 * returns the x and y coordinates of the bottom-right-most point in the
	 * piece
	 */
	getBottomRight: function() {
		var outx = this.points[0].x;
		var outy = this.points[0].y;
		for (let i = 1; i < this.points.length; ++i) {
			if (this.points[i].x > outx)
				outx = this.points[i].x;
			if (this.points[i].y > outy)
				outy = this.points[i].y;
		}

		return new Point(outx, outy);
	}
}

/*
 * Constructor for a Board object. pieces[0] MUST be the piece that needs to be
 * removed from the puzzle to win
 */
var Board = function(pieces) {
	this.pieces = pieces;
	this.selectedPiece = null;
	this.height = 5;
	this.width = 4;
	this.moves = 0;
}

Board.prototype = {
	/*
	 * Sets the selected piece as the piece at the given x and y coordinates
	 */
	selectPiece: function(x, y) {
		for (let i = 0; i < this.pieces.length; ++i) {
			for (let j = 0; j < this.pieces[i].points.length; ++j) {
				if (this.pieces[i].points[j].x == x && 
					this.pieces[i].points[j].y == y) {
					this.selectedPiece = this.pieces[i];
					return;
				}
			}
		}

		// if we get here then they clicked on an empty square, so
		// deselect the current piece
		this.selectedPiece = null;
	},

	/*
	 * Returns true if a piece is on a certain point, false otherwise
	 */
	isOccupied: function(x, y) {
		for (let i = 0; i < this.pieces.length; ++i) {
			for (j = 0; j < this.pieces[i].points.length; ++j) {
				if (this.pieces[i].points[j].x == x && 
					this.pieces[i].points[j].y == y) {
					return true;
				}
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
		var dx, dy, tempx, tempy;

		if (this.selectedPiece == null) {
			return false;
		}

		// check win
		if (this.selectedPiece === this.pieces[0] &&
			this.selectedPiece.getTopLeft().x == 1 &&
			this.selectedPiece.getTopLeft().y == 3 &&
			direction == 2) {
			$("#message").html("YOU WIN!");
			$("#play-again").show();
			return true;
		}

		switch (direction) {
			case 0: dx = 0; dy = -1; break;
			case 1: dx = 1; dy = 0; break;
			case 2: dx = 0; dy = 1; break;
			case 3: dx = -1; dy = 0; break;
		}

		for (let i = 0; i < this.selectedPiece.points.length; ++i) {
			tempx = this.selectedPiece.points[i].x + dx;
			tempy = this.selectedPiece.points[i].y + dy;
			if ((tempx >= this.width || tempx < 0 || 
				tempy >= this.height || tempy < 0) || 
				this.isOccupied(tempx, tempy) &&
				!this.selectedPiece.containsPoint(tempx,tempy)){
				// if the point we're trying to move to is
				// occupied by another piece
				return false;
			}
		}

		// if we've gotten here it means we're clear to move the piece
		this.selectedPiece.move(direction);
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
	this.canvas.height = SQUARE_SIZE * board.height;
	document.getElementById('canvas-holder').appendChild(this.canvas);
	this.ctx = canvas.getContext('2d');
	this.ctx.fillStyle = "#fffee7";
	this.ctx.strokeStyle = "#222222";
	this.ctx.lineWidth = 4;

}

GUI.prototype = {
	drawBoard: function() {
		this.ctx.fillStyle = "#dddddd";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < this.board.pieces.length; ++i) {
			if (this.board.selectedPiece === this.board.pieces[i])
				this.ctx.fillStyle = "#008cff";
			else
				this.ctx.fillStyle = "#fffee7";
			var tl = this.board.pieces[i].getTopLeft();
			var br = this.board.pieces[i].getBottomRight();
			this.ctx.beginPath();
			this.ctx.rect(tl.x * SQUARE_SIZE + 5, 
				tl.y * SQUARE_SIZE + 5,
				(br.x - tl.x + 1) * SQUARE_SIZE - 10, 
				(br.y - tl.y + 1) * SQUARE_SIZE - 10);
		//	this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fillRect(tl.x * SQUARE_SIZE + 5,
				tl.y*SQUARE_SIZE + 5,
				(br.x - tl.x + 1) * SQUARE_SIZE - 10, 
				(br.y - tl.y + 1) * SQUARE_SIZE - 10);
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

		x = Math.floor(x / SQUARE_SIZE);
		y = Math.floor(y / SQUARE_SIZE);

		this.board.selectPiece(x, y);

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
var hitKey = function(e) { gooey.handleKey(e); };


$(document).ready(function() { main(); });

var gooey;

var main = function() {
	// make the board
	var pieces = new Array(10);
	pieces[0] = new Piece([new Point(1, 0), new Point(2, 0), 
		new Point(1, 1), new Point(2, 1)]);
	pieces[1] = new Piece([new Point(0, 0), new Point(0, 1)]);
	pieces[2] = new Piece([new Point(3, 0), new Point(3, 1)]);
	pieces[3] = new Piece([new Point(0, 2), new Point(0, 3)]);
	pieces[4] = new Piece([new Point(1, 2)]);
	pieces[5] = new Piece([new Point(2, 2)]);
	pieces[6] = new Piece([new Point(3, 2), new Point(3, 3)]);
	pieces[7] = new Piece([new Point(1, 3)]);
	pieces[8] = new Piece([new Point(2, 3)]);
	pieces[9] = new Piece([new Point(1, 4), new Point(2, 4)]);
	

	var b = new Board(pieces);

	gooey = new GUI(b);

	// handle clicking on the canvas
	document.getElementById('canvas').addEventListener("click", clickIt);
	document.addEventListener("keydown", hitKey);
	
	gooey.updateMoves(0);
	gooey.drawBoard();
};

var reset = function() {
	// remove the canvas
	document.getElementById('canvas').removeEventListener("click", clickIt);
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
