/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// global variables
const squareSize = 50;
const xdim = 10;
const ydim = 10;
const bgColor = "#005377";
const colors = [bgColor, "#95190c", "#610345", "#107e7d", "#fcca46", "#a44200",
	"#f2f3ae"];
var board, ctx, canvas, bar, barctx, currTime, deltaTime, sDeltaTime, lastColor;
var score = 0;
var turn = 0;
var turnsToGo = 5;
var numColors = 3;
var prevTime = Date.now();
var deltaScalar = 1/16;
var animating = false;
var offsetInterval = 5;
var addFlag = false;


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
	barctx.strokeStyle = "#1f0053";
	barctx.lineWidth = 2;
	updateBar(5);

	ctx.strokeStyle = "#1f0053";
	ctx.lineWidth = 1;

	// create board
	board = new Array(xdim);
	var nc; // new color
	for (let i = 0; i < xdim; i++) {
		board[i] = new Array(ydim);
		for (let j = 0; j < ydim; j++) {
			if (j > 4)
				nc = Math.floor(Math.random()*numColors + 1);
			else
				nc = 0;
			board[i][j] = {c: nc, s: 0, h: 0, d: 0}
			ctx.rect(i * squareSize, j * squareSize, squareSize,
				squareSize);
		}
	}

	// show score
	updateScore();

	// handle clicking on the canvas
	$('#canvas').mousedown(function(e) {
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

		x = Math.floor(x / squareSize);
		y = Math.floor(y / squareSize);

		clickCell(x, y);
	});

	drawBoard();
	update();
};

var clickCell = function(x, y) {
	if (!animating && board[x][y].c > 0) {
		animating = true;
		lastColor = board[x][y].c;
		var cleared = checkAdjacent(x, y, board[x][y].c);
		assignH();
		if (cleared > 5) {
			if (cleared < 8) sayIt("Nice!");
			else if (cleared < 12) sayIt("Great!");
			else if (cleared < 18) sayIt("Super!");
			else if (cleared < 24) sayIt("Amazing!");
			else if (cleared < 38) sayIt("Awesome!");
			else if (cleared < 64) sayIt("Fantastic!!");
			else if (cleared < 90) sayIt("Incredible!!");
			else sayIt("UNBELIEVABLE!!!!");
		}
		for (let i = 0; i < cleared; i++) {
			score += (i + 1) * 10;
		}
		updateScore();
		turn++;
		turnsToGo--;
		if (turnsToGo == 0) {
			addFlag = true;
			if (turn < 18) {
				turnsToGo = 5;
				numColors = 3;
			} else if (turn < 27) {
				turnsToGo = 4;
				numColors = 3;
			} else if (turn < 35) {
				turnsToGo = 3;
				numColors = 4;
			} else if (turn < 48) {
				turnsToGo = 3;
				numColors = 5;
			} else {
				turnsToGo = 3;
				numColors = 6;
			}
		}
		updateBar(turnsToGo);
		update();
	}
};

var updateBar = function(x) {
	console.log(turnsToGo);
	barctx.clearRect(0, 0, 50, ydim * squareSize);
	for (let q = x; q > 0; q--) {
		barctx.beginPath();
		barctx.arc(25, (ydim * squareSize) - (q*50), 20, 0, 2 * Math.PI);
		barctx.fillStyle = "#f1a208";
		barctx.fill();
		barctx.stroke();
	}
};

// assigns h values (how far a block needs to fall, "height") to all cells
var assignH = function() {
	var newH;
	var q;
	for (let i = 0; i < xdim; i++) {
		for (let j = 0; j < ydim - 1; j++) {
			newH = 0;
			if (board[i][j].c > 0) {
				// if there's empty space below this block
				q = j + 1;
				// count up empty spaces below this one
				while (q < ydim) {
					if (board[i][q].c == 0) newH++;
					q++;
				}
				board[i][j].h = newH;
			}
		}
	}
};

var updateScore = function() {
	$('#score').fadeOut(300, function() {
		$(this).text(score).fadeIn(300);
	});
};

// returns the number of blocks eliminated
var checkAdjacent = function(x, y, color) {
	if (x >= xdim || x < 0 || y >= ydim || y < 0) return 0;
	var out = 0;
	if (board[x][y].c == color) {
		board[x][y].c = 0;
		board[x][y].s = 1;
		out = 1;
		out += checkAdjacent(x + 1, y, color);
		out += checkAdjacent(x - 1, y, color);
		out += checkAdjacent(x, y + 1, color);
		out += checkAdjacent(x, y - 1, color);
	}
	return out;
};

var update = function() {
	currTime = Date.now();
	deltaTime = currTime - prevTime;
	sDeltaTime = deltaTime * deltaScalar;

	if (animating) {
		drawBoard();
	}
	prevTime = currTime;
	requestAnimationFrame(update);
};


// draws a size*squareSize by size*squareSize square of color color centered at
// board position i, j, vertically offset by vOffset
var drawSquare = function(i, j, vOffset, size, color) {
	ctx.fillStyle = colors[color];
	ctx.fillRect((i + (1-size) / 2) * squareSize,
		((j + (1-size) / 2) + vOffset) * squareSize,
		size * squareSize, size * squareSize);
};

var drawBoard = function() {
	ctx.fillStyle = bgColor
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var done = true;
	for (let i = 0; i < xdim; i++) {
		for (let j = 0; j < ydim; j++) {
			if (board[i][j].s > 0) { // cell was clicked
				done = false;
				drawSquare(i, j, 0, board[i][j].s, lastColor);
				board[i][j].s -= 0.15 * sDeltaTime;
				if (board[i][j].s < 0) board[i][j].s = 0;
			} else {
				if (board[i][j].c > 0) { // colored square
					drawSquare(i, j,
						board[i][j].d, 1,
						board[i][j].c);
				}
				if (board[i][j].h > board[i][j].d) {
 					// block falling
					done = false;
					board[i][j].d += 0.15 * sDeltaTime;
					if (board[i][j].d > board[i][j].h) {
						//board[i][j].h = 0;
						board[i][j].d = board[i][j].h;
					}
				}
			}
		}
	}
	ctx.stroke();
	if (done) {
		cascadeBlocks();
		if (addFlag) {
			setTimeout(function() { addRow(); }, 100);
			addFlag = false;
		}
		animating = false;
	}
};

var addRow = function() {
	animating = true;
	var newRow = new Array(xdim);
	for (let i = 0; i < xdim; i++) {
		if (board[i][0].c > 0) {
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
	} else { // done
		for (let i = 0; i < xdim; i++) {
			for (let j = 0; j < ydim - 1; j++) {
				board[i][j].c = board[i][j + 1].c;
			}
			board[i][ydim - 1] = {c: newRow[i], s: 0, h: 0, d: 0};
		}
		ctx.stroke();
		animating = false;
	}
};

var cascadeBlocks = function() {
	var changed = false;
	for (let i = 0; i < ydim; i++) {
		for (let j = ydim - 2; j >= 0; j--) {
			board[i][j].d = 0;
			board[i][j].h = 0;
			if (board[i][j].c > 0 && board[i][j + 1].c == 0) {
				board[i][j + 1].c = board[i][j].c;
				board[i][j].c = 0;
				changed = true;
			}
		}
	}
	if (changed) cascadeBlocks();
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
};

var updateScore = function() {
	$('#score').fadeOut(300, function() {
		$(this).text(score).fadeIn(300);
	});
}
