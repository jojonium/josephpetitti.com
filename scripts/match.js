/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// globals
const squareSize = 40;
const xdim = 10;
const ydim = 10;
const bgColor = "#dddddd";
const colors = [bgColor, "#e37682", "#ffeed4", "#ddbc37", "#09e3f7", "#5f4d93",
	"34d058"];
const offsetInterval = 5;
var board, score;
var numColors = 3;
var turn = 0;
var turnsToGo = 5;

$(document).ready(function() { start(); });

var start = function() {
	// make the canvas
	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = xdim * squareSize;
	canvas.height = ydim * squareSize;
	ctx = canvas.getContext('2d');
	document.getElementById('canvas-holder').appendChild(canvas);

	// make the bar
	bar = document.createElement('canvas');
	bar.id = 'bar';
	bar.width = 50;
	bar.height = ydim * squareSize;
	barctx = bar.getContext('2d');
	document.getElementById('canvas-holder').appendChild(bar);
	barctx.fillStyle = "#00ff00";
	barctx.strokeStyle = "green";
	barctx.lineWidth = 2;
	for (let q = turnsToGo; q > 0; q--) {
		barctx.beginPath();
		barctx.arc(25, (ydim * squareSize) - (q*50), 20, 0, 2 * Math.PI);
		barctx.fillStyle = "#00ff00";
		barctx.fill();
		barctx.stroke();
	}

	// create board
	board = new Array(xdim);
	for (let i = 0; i < xdim; i++) {
		board[i] = new Array(ydim);
		for (let j = 0; j < ydim; j++) {
			if (j > 4) board[i][j] =
				Math.floor(Math.random() * numColors + 1);
			else board[i][j] = 0;
		}
	}

	score = 0;
	updateScore();

	drawBoard();

	$('#canvas').mousedown(function(e) {
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

		x = Math.floor(x / squareSize);
		y = Math.floor(y / squareSize);

		clickCell(x, y);
	});
};

var sayIt = function(string) {
	var left = 38 + Math.floor(Math.random() * 5) + "%";
	$('#message').css("left", left);
	var color = "rgb(" + Math.floor(Math.random() * 256) + ", " +
		Math.floor(Math.random() * 256) + ", " + 
		Math.floor(Math.random() * 256) + ")";
	$('#message').css("color", color);
	var rot = "rotate(" + (Math.floor(Math.random() * 7) - 3) * 15 + "deg";
	$('#message').css("transform", rot);
	$('#message').html(string);
	$('#message').fadeIn(800, function() {
		$(this).fadeOut(800);
	});
};

var lose = function() {
	$('#game-over').html("Game over! You lasted " + turn + " turns.");
	$('#play-again').show();
	$('#canvas').off();
}


// handle a click on a cell
var clickCell = function(x, y) {
	if (board[x][y] > 0) {
		turn++;
		turnsToGo--;
		var cleared = checkAdjacent(x, y, board[x][y]);
		if (cleared.length > 5) {
			if (cleared.length < 8) sayIt("Nice!");
			else if (cleared.length < 12) sayIt("Great!");
			else if (cleared.length < 18) sayIt("Super!");
			else if (cleared.length < 24) sayIt("Amazing!");
			else if (cleared.length < 38) sayIt("Awesome!");
			else if (cleared.length < 64) sayIt("Fantastic!!");
			else if (cleared.length < 90) sayIt("Incredible!!");
			else sayIt("UNBELIEVABLE!!!!");
		}
		for (let i = 0; i < cleared.length; i++) {
			score += (i + 1) * 10;
		}
		setTimeout(function() {
			cascadeBlocks(offsetInterval);
		}, 50);
		//cascadeBlocksNoAnimate();
		updateScore();

		if (turnsToGo == 0) {
			addRowNoAnimate();
			if (turn < 13) {
				turnsToGo = 5;
				numColors = 3;
			} else if (turn < 23) {
				turnsToGo = 4;
				numColors = 4;
			} else if (turn < 37) {
				turnsToGo = 3;
				numColors = 5;
			} else {
				turnsToGo = 3;
				numColors = 6;
			}
		}

		// make sure they always have a valid move
		var allBlank = true;
		for (let i = 0; i < xdim; i++) {
			if (board[i][ydim - 1] > 0) allBlank = false;
		}
		if (allBlank) addRow();
			
		drawBoard();

		// draw the bar
		barctx.clearRect(0, 0, 50, ydim * squareSize);
		for (let q = turnsToGo; q > 0; q--) {
			barctx.beginPath();
			barctx.arc(25, (ydim * squareSize) - (q*50), 20, 0, 2 * Math.PI);
			barctx.fillStyle = "#00ff00";
			barctx.fill();
			barctx.stroke();
		}
	}

};

var addRowNoAnimate = function() {
	var newRow = new Array(xdim);
	for (let i = 0; i < xdim; i++) {
		if (board[i][0] > 0) {
			lose();
			return;
		}
		newRow[i] = Math.floor(Math.random() * numColors + 1);
	}
	for (let i = 0; i < xdim; i++) {
		for (let j = 0; j < ydim - 1; j++) {
			board[i][j] = board[i][j + 1];
		}
		board[i][ydim - 1] = newRow[i];
	}
}

var addRow = function() {
	var newRow = new Array(xdim);
	for (let i = 0; i < xdim; i++) {
		if (board[i][0] > 0) {
			lose();
			return;
		}
		newRow[i] = Math.floor(Math.random() * numColors + 1);
	}

	moveUp(newRow, offsetInterval);
};

var moveUp = function(newRow, offset, imageData) {
	if (!imageData) {
		imageData = ctx.getImageData(0, squareSize, xdim * squareSize, 
			(ydim - 1) *  squareSize);
	}
	ctx.putImageData(imageData, 0, squareSize - offset);
	
	// do the bottom row
	for (let i = 0; i < xdim; i++) {
		ctx.fillStyle = colors[newRow[i]];
		ctx.fillRect(i * squareSize, (ydim - 1) * squareSize + (squareSize - offset),
			squareSize, offset);
	}
		

	if (offset < squareSize) {
		setTimeout(function() {
			moveUp(newRow, offset + offsetInterval, imageData);
		}, 20);
	} else {
		ctx.stroke();
		for (let i = 0; i < xdim; i++) {
			for (let j = 0; j < ydim - 1; j++) {
				board[i][j] = board[i][j + 1];
			}
			board[i][ydim - 1] = newRow[i];
		}
	}
}

var cascadeBlocksNoAnimate = function() {
	var changed = false;
	for (let i = 0; i < ydim; i++) {
		for (let j = ydim; j >= 0; j--) {
			if (board[i][j] > 0 && board[i][j + 1] == 0) {
				board[i][j + 1] = board[i][j];
				board[i][j] = 0;
				changed = true;
			}
		}
	}
	if (changed) cascadeBlocksNoAnimate();
}

var cascadeBlocks = function(offset) {
	var changed = false;
	var offsetFlag = false;
	for (let i = 0; i < ydim; i++) {
		for (let j = ydim; j >= 0; j--) {
			if (board[i][j] > 0 && board[i][j + 1] == 0) {
				// need to bring this column down
				for (var q = j; q >= 0; q--) {
					ctx.fillStyle = colors[board[i][q]];
					ctx.fillRect(i * squareSize, 
						q * squareSize + offset,
						squareSize, squareSize);
					if (offset >= squareSize) {
						offsetFlag = true;
						board[i][q+1] = board[i][q];
					}
				}
				// do the top row now
				ctx.fillStyle = colors[0];
				ctx.fillRect(i * squareSize, 0, squareSize,
					offset);
				ctx.stroke();
				if (offset >= squareSize) {
					board[i][0] = 0;
				}
				changed = true;
			}
		}
	}

	if (offsetFlag) offset = 0;
	if (changed){
		setTimeout(function() {
			cascadeBlocks(offset + offsetInterval);
		}, 20);
	} else {
		if (turnsToGo == 0) {
			setTimeout(function() {
				addRow();
			}, 10);
		}
	}
};

// returns an array (in no order) of all squares of the given color connected
// to board[x][y]
var checkAdjacent = function(x, y, color) {
	if (x >= xdim || x < 0 || y >= ydim || y < 0) return [];
	var out = [];
	if (board[x][y] == color) {
		board[x][y] = 0;
		out = [{x:x, y:y}];
		out = out.concat(checkAdjacent(x + 1, y, color));
		out = out.concat(checkAdjacent(x - 1, y, color));
		out = out.concat(checkAdjacent(x, y + 1, color));
		out = out.concat(checkAdjacent(x, y - 1, color));
	}
	return out;
};

var drawBoard = function() {
	var xoff = 0;
	var yoff = 0;
	ctx.strokeStyle = "#666666";
	
	for (let i = 0; i < xdim; i++) {
		for (let j = 0; j < ydim; j++) {
			ctx.fillStyle = colors[board[i][j]];
			ctx.fillRect(xoff, yoff, squareSize, squareSize);
			ctx.rect(xoff, yoff, squareSize, squareSize);
			ctx.stroke();

			yoff += squareSize;
		}
		xoff += squareSize;
		yoff = 0;
	}
};

var updateScore = function() {
	$('#score').fadeOut(300, function() {
		$(this).text(score).fadeIn(300);
	});
}
