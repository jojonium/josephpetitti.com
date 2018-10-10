/* (c) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

// cell structure
var cell = function(d, f) {
	return{direction:d, food:f};
	// direction: 0=nosnake, 1=up, 2=right, 3=down, 4=left
}

// global variables
var xdim, ydim, board, canvas, ctx, score, squareSize, head, snakeColor,
	nextDirection, stopped, newColor;

$(document).ready(function() {
	$('#small').click(function() {
		xdim = 10;
		ydim = 10;
		squareSize = 50;
		start();
	});

	$('#medium').click(function() {
		xdim = 15;
		ydim = 15;
		squareSize = 40;
		start();
	});

	$('#large').click(function() {
		xdim = 20;
		ydim = 20;
		squareSize = 30;
		start();
	});

	$('#huge').click(function() {
		xdim = 30;
		ydim = 30;
		squareSize = 25;
		start();
	});

	$('#custom').click(function() {
		squareSize = 30;
		xdim = $('#input-width').val();
		ydim = $('#input-height').val();
		if (xdim < 1) {
			xdim = 15;
			$('#input-width').val(15);
		}
		if (ydim < 1) {
			ydim = 15;
			$('#input-height').val(15);
		}
		start();
	});
});

var start = function() {
	// make the canvas
	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = xdim * squareSize;
	canvas.height = ydim * squareSize;
	ctx = canvas.getContext('2d');
	document.getElementById('canvas-holder').appendChild(canvas);

	// create board array
	board = new Array(xdim);
	for (var i = 0; i < xdim; i++) {
		board[i] = new Array(ydim);
		for (var j = 0; j < ydim; j++) {
			board[i][j] = cell(0, false);
		}
	}

	score = 1;

	// set up board
	initBoard();

	updateScore();

	$('button').prop('disabled', true);
	$('input').prop('disabled', true);

	head = {x:Math.floor(xdim / 2),
		y:Math.floor(ydim / 2)};


	// place snake
	board[head.x][head.y].direction = 1;
	nextDirection = 1;
	snakeColor = 'red';

	$(document).keydown(function(e) {
		if (e.which == 87 || e.which == 38 || e.which == 75) {
			// up
			e.preventDefault();
			stopped = false;
			if (board[head.x][head.y].direction != 3)
				nextDirection = 1;
		} else if (e.which == 68 || e.which == 39 | e.which == 76) {
			// right
			e.preventDefault();
			stopped = false;
			if (board[head.x][head.y].direction != 4) 
				nextDirection = 2;
		} else if (e.which == 83 || e.which == 40 | e.which == 74) {
			// down
			e.preventDefault();
			stopped = false;
			if (board[head.x][head.y].direction != 1)
				nextDirection = 3;
		} else if (e.which == 65 || e.which == 37 | e.which == 72) {
			//left
			e.preventDefault();
			stopped = false;
			if (board[head.x][head.y].direction != 2) 
				nextDirection = 4;
		} else if(e.which == 32) {
			e.preventDefault();
			stopped = !stopped;
		}
	});

	drawHead(head.x, head.y, 1);
	placeFood();

	stopped = true; // press a button to start
	setInterval(function() {
		if (!stopped)
			moveSnake();
	}, 100);
	
}

var moveSnake = function() {
	var ate = board[head.x][head.y].food;
	if (ate) {
		board[head.x][head.y].food = false;
		snakeColor = newColor;
	}
	var newX = head.x;
	var newY = head.y;
	// draw the new head
	switch (nextDirection) {
		case 1: head.y--; break;
		case 2: head.x++; break;
		case 3: head.y++; break;
		case 4: head.x--; break;
	}
	// see if they went out of bounds or died
	if (head.x >= xdim || head.x < 0 || head.y >= ydim || head.y < 0 ||
		board[head.x][head.y].direction) {
		stopped = true;
		if (score == xdim * ydim)
			alert("Holy shit you won!");
		else 
			$('#score').html($('#score').html() + " &mdash; You lose!");
		$('#play-again').removeAttr('disabled').show();
		return;
	}
	board[head.x][head.y].direction = nextDirection;
	drawHead(head.x, head.y, nextDirection);
	drawNeck(newX, newY, nextDirection);

	// travel down snake and remove tail
	if (!ate) {
		// travel backwards
		for (var i = 1; i < score; i++) {
			switch (board[newX][newY].direction) {
				case 1: newY++; break;
				case 2: newX--; break;
				case 3: newY--; break;
				case 4: newX++; break;
			}
		}
		// now that we're at the old tail, erase it
		ctx.fillStyle = '#bbbbbb';
		ctx.fillRect(newX * squareSize, newY * squareSize,
			squareSize, squareSize);
		board[newX][newY].direction = 0;
	} else {
		score++;
		updateScore();
		placeFood();
	}

}

var drawHead = function(x, y, dir) {
	ctx.fillStyle = snakeColor;
	ctx.lineJoin = "round";
	var wid = squareSize / 3;
	var fromX, fromY, toX, toY, pX, pY;

	switch(dir) {
		case 1:
			fromX = x * squareSize + wid;
			fromY = y * squareSize + squareSize - 2;
			toX = fromX + wid;
			toY = fromY;
			pX = x * squareSize + squareSize / 2;
			pY = y * squareSize;
			break;
		case 2:
			fromX = x * squareSize + 2;
			fromY = y * squareSize + wid;
			toX = fromX;
			toY = fromY + wid;
			pX = x * squareSize + squareSize;
			pY = y * squareSize + squareSize / 2;
			break;
		case 3:
			fromX = x * squareSize + wid;
			fromY = y * squareSize + 2;
			toX = fromX + wid;
			toY = fromY;
			pX = x * squareSize + squareSize / 2;
			pY = y * squareSize + squareSize;
			break;
		case 4:
			fromX = x * squareSize + squareSize - 2;
			fromY = y * squareSize + wid;
			toX = fromX;
			toY = fromY + wid;
			pX = x * squareSize;
			pY = y * squareSize + squareSize / 2;
			break;
	}

	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(pX, pY);
	ctx.lineTo(toX, toY);
	ctx.closePath();
	ctx.fill();
}

var drawNeck = function(x, y, nextDir) {
	ctx.fillStyle = snakeColor;
	var prevDir = board[x][y].direction;
	var wid = squareSize / 3;
	console.log("prevDir: " + prevDir + " nextDir: " + nextDir);

	if (prevDir == nextDir) { // straight
		if (prevDir == 1 || prevDir == 3) { // up or down
			ctx.fillRect(x * squareSize + wid, y * squareSize + 1,
				squareSize - (wid * 2), squareSize - 2);
		} else { // left or right
			ctx.fillRect(x * squareSize + 1, y * squareSize + wid,
				squareSize - 2, squareSize - (wid * 2));
		}
	} else { // turning
		console.log("HERE");
		var fromX, fromY, centerX, centerY, radius1, radius2, startA,
			endA, c1, c2
		ctx.fillStyle = '#bbbbbb';
		ctx.fillRect(x * squareSize, y * squareSize,
			squareSize, squareSize);
		ctx.fillStyle = snakeColor;
		radius1 = squareSize - wid;
		radius2 = squareSize - wid - wid
		if ((prevDir == 1 && nextDir == 2) ||
			(prevDir == 4 && nextDir == 3)) {
			console.log("ASDFASDF");
			// bottom to right
			fromX = x * squareSize + wid + 1;
			fromY = y * squareSize + squareSize - 1;
			centerX = (x + 1) * squareSize;
			centerY = (y + 1) * squareSize;
			startA = Math.PI;
			endA = 1.5 * Math.PI;
			c1 = false;
			c2 = true;
		} else if ((prevDir == 1 && nextDir == 4) ||
			(prevDir == 2 && nextDir == 3)) {
			// bottom to left
			fromX = x * squareSize + wid + 1;
			fromY = y * squareSize + squareSize - 1;
			centerX = x * squareSize;
			centerY = (y + 1) * squareSize;
			startA = 0;
			endA = 1.5 * Math.PI;
			c1 = true;
			c2 = false;
		} else if ((prevDir == 3 && nextDir == 2) ||
			(prevDir == 4 && nextDir == 1)) {
			// top to right
			fromX = x * squareSize + wid + 1;
			fromY = y * squareSize + 1;
			centerX = (x + 1) * squareSize;
			centerY = y * squareSize;
			startA = Math.PI;
			endA = .5 * Math.PI;
			c1 = true;
			c2 = false;
		} else if ((prevDir == 3 && nextDir == 4) ||
			prevDir == 2 && nextDir == 1) {
			// top to left
			fromX = x * squareSize + wid + 1;
			fromY = y * squareSize + 1
			centerX = x * squareSize;
			centerY = y * squareSize;
			startA = 0;
			endA = .5 * Math.PI;
			c1 = false;
			c2 = true;
		}
		ctx.beginPath();
		ctx.moveTo(fromX, fromY);
		ctx.arc(centerX, centerY, radius1, startA, endA, c1);
		ctx.arc(centerX, centerY, radius2, endA, startA, c2);
		ctx.closePath();
		ctx.fill();
	}
}


var drawSnake = function(x, y) {
	ctx.fillStyle = snakeColor;
	
	// find the direction of the previous unit
	var newX = x;
	var newY = y;
	var prevDirection = 0;
	var wid = squareSize * 0.4;
	switch (board[x][y].direction) {
		case 1: prevDirection = board[newX][--newY].direction; break;
		case 2: prevDirection = board[++newX][newY].direction; break;
		case 3: prevDirection = board[newX][++newY].direction; break;
		case 4: prevDirection = board[--newX][newY].direction; break;
	}
	if (prevDirection == board[x][y].direction) {  // going straight
		if (prevDirection == 1 || prevDirection == 3) {
			ctx.fillRect(x * squareSize + wid, y * squareSize + 1,
				squareSize - (wid * 2), squareSize - 2);
		} else {
			ctx.fillRect(x * squareSize + 1, y * squareSize + wid,
				squareSize - 2, squareSize - (wid * 2));
		}
	} else { // turning
		if ((prevDirection == 1 && board[x][y].direction == 2) ||
			(prevDirection == 4 && board[x][y].direction == 3)) {
			// bottom to right
		} else if ((prevDirection == 1 && board[x][y].direction == 4) ||
			(prevDirection == 2 && board[x][y].direction == 3)) {
			// bottom to left
		} else if ((prevDirection == 3 && board[x][y].direction == 2) ||
			(prevDirection == 4 && board[x][y].direction == 1)) {
			// top to right
		} else if ((prevDirection == 3 && board[x][y].direction == 4) ||
			prevDirection == 2 && board[x][y].direction == 1) {
			// top to left
		}
	}
}

var initBoard = function() {
	var xoff = 0;
	var yoff = 0;

	// draw initial board
	ctx.fillStyle = '#bbbbbb';
	
	for (var i = 0; i < ydim; i++) {
		for (var j = 0; j < xdim; j++) {
			ctx.fillRect(xoff, yoff, squareSize, squareSize);
			ctx.stroke();

			xoff += squareSize;
		}
		yoff += squareSize;
		xoff = 0;
	}
}

var placeFood = function() {
	do {
		var foodx = Math.floor(Math.random() * xdim);
		var foody = Math.floor(Math.random() * ydim);
	} while (board[foodx][foody].direction);
	board[foodx][foody].food = true;
	ctx.beginPath();
	ctx.arc(foodx * squareSize + squareSize / 2,
		foody * squareSize + squareSize / 2,
		squareSize / 2 - 8, 0, 2 * Math.PI, false);
	ctx.closePath();
	newColor = "rgb(" + Math.floor(Math.random() * 256) + ", " +
		Math.floor(Math.random() * 256) + ", " +
		Math.floor(Math.random() * 256) + ")";
	ctx.fillStyle = newColor;
	ctx.fill();
}

var updateScore = function() {
	$('#score').html("Score: " + score);
}
