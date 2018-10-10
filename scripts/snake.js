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
			if (board[head.x][head.y].direction != 3)
				nextDirection = 1;
		} else if (e.which == 68 || e.which == 39 | e.which == 76) {
			// right
			e.preventDefault();
			if (board[head.x][head.y].direction != 4) 
				nextDirection = 2;
		} else if (e.which == 83 || e.which == 40 | e.which == 74) {
			// down
			e.preventDefault();
			if (board[head.x][head.y].direction != 1)
				nextDirection = 3;
		} else if (e.which == 65 || e.which == 37 | e.which == 72) {
			//left
			e.preventDefault();
			if (board[head.x][head.y].direction != 2) 
				nextDirection = 4;
		} else if(e.which == 32) {
			e.preventDefault();
			stopped = !stopped;
		}
	});

	drawSnake(head.x, head.y);
	placeFood();

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
			alert("You lose!");
		$('#play-again').removeAttr('disabled').show();
		return;
	}
	board[head.x][head.y].direction = nextDirection;
	drawSnake(head.x, head.y);

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
		

var drawSnake = function(x, y) {
	ctx.fillStyle = snakeColor;
	ctx.fillRect(x * squareSize + 1, y * squareSize + 1, squareSize - 2, squareSize - 2);
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
