// create global canvas
var canvas = document.createElement('canvas');
var ctx, currentPlayer, b, whiteCPU, redCPU, m;
canvas.id = 'canvas';
canvas.width = 480;
canvas.height = 480;
var selected = {x: undefined, y: undefined};


$('document').ready(function() {
	document.getElementById('canvas-holder').appendChild(canvas);
	ctx = canvas.getContext('2d');
	initUI();
	b = new Board();
	m = new MiniMax();
	update();
	
	$("#play-again").click(function() {
		location.reload();
	});
	
	$("#2-players").click(function() {
		$("button").hide();
		whiteCPU = false;
		redCPU = false;
		redTurn();
	});
	
	$("#1-player-red").click(function() {
		$("button").hide();
		computerSay("Okay, I'll be white");
		m = new MiniMax($("#difficulty").val());
		redCPU = false;
		whiteCPU = true;
		redTurn();
	});
	
	$("#1-player-white").click(function() {
		$("button").hide();
		computerSay("Okay, I'll be red");
		m = new MiniMax($("#difficulty").val());
		redCPU = true;
		whiteCPU = false;
		redTurn();
	});
	
	// clicking on the board
	$("#canvas").click(function(e) {
		var x;
		var y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		
		squareX = Math.floor(x / 60);
		squareY = Math.floor(y / 60);
		
		// select
		if (Math.sign(b.gamestate[squareX][squareY]) == currentPlayer) {
			selected.x = squareX;
			selected.y = squareY;
			update();
		}
		
		// move
		else if (selected.x != undefined && selected.y != undefined) {
			var m = b.move(currentPlayer, selected.x, selected.y, squareX, squareY);
			if (m) {
				selected.x = undefined;
				selected.y = undefined;
				update();
				if (m == 2) {
					computerSay("Nice capture! Go again");
					b.multiturn = true;
				} else if (m == 1) {
					if (currentPlayer == b.red) setTimeout(whiteTurn, 200);
					else setTimeout(redTurn, 200);
				}
				
			}
		}
	});
	
	computerSay("How many human players?");
});


var computerSay = function(string) {
	$('#log').append("<p>" + string + "</p>");
	$('#log').scrollTop($('#log')[0].scrollHeight);
};

var redTurn = function() {
	var w = b.checkWin();
	if (!w) {
		computerSay("It's Red's turn");
		if (redCPU) {
			m.buildTree(b, b.red, function(bestMove) {
				b.move(b.red, bestMove.fromX, bestMove.fromY, bestMove.toX, bestMove.toY);
				update();
				whiteTurn();
			});
		} else {
			currentPlayer = b.red;
		}
	} else {
		if (w == b.white)
			computerSay("White wins!");
		else if (w == b.red)
			computerSay("Red wins!");
		$("#canvas").off();
		$("#play-again").show();
	}
};

var whiteTurn = function() {
	var w = b.checkWin()
	if (!w) {
		computerSay("It's White's turn");
		if (whiteCPU) {
			m.buildTree(b, b.white, function(bestMove) {
				b.move(b.white, bestMove.fromX, bestMove.fromY, bestMove.toX, bestMove.toY);
				update();
				redTurn();
			});
		} else {
			currentPlayer = b.white;
		}
	} else {
		if (w == b.white)
			computerSay("White wins!");
		else if (w == b.red)
			computerSay("Red wins!");
		$("#canvas").off();
	}
};










/*=================================*\
		Board
\*=================================*/
var Board = function() {
	this.empty = 0;
	this.red = 1;
	this.white = -1;
	this.redMan = 1;
	this.redKing = 2;
	this.whiteMan = -1;
	this.whiteKing = -2;
	this.multiturn = false;
	// 0 means no piece is on that square
	// 1 means a red man is on that square, 2 means a red king is on that square
	// -1 means a white man is on that square, -2 means a white king is on that square
	this.gamestate = [[0, 1, 0, 0, 0, -1, 0, -1], // this needs to be sideways
	                  [1, 0, 1, 0, 0, 0, -1, 0],  // because we want x (the column)
	                  [0, 1, 0, 0, 0, -1, 0, -1], // to be first
	                  [1, 0, 1, 0, 0, 0, -1, 0],
	                  [0, 1, 0, 0, 0, -1, 0, -1],
	                  [1, 0, 1, 0, 0, 0, -1, 0],
		          [0, 1, 0, 0, 0, -1, 0, -1],
                          [1, 0, 1, 0, 0, 0, -1, 0]];
};

Board.prototype = {
	copy: function() {
		var out = new Board();
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				out.gamestate[i][j] = this.gamestate[i][j];
			}
		}
		return out;
	},
	
	// returns 0 if invalid, 1 if valid hop, 2 if valid capture
	validateMove: function(player, fromX, fromY, toX, toY, s) { // s supresses messages (if computer called it)
		// is the source controlled by the player?
		if (Math.sign(this.gamestate[fromX][fromY]) != player) {
			if (!s) computerSay("The player doesn't control that piece");
			return 0;
		}
		
		// destination cannot contain a piece
		if (this.gamestate[toX][toY]) {
			if (!s) computerSay("You can't move to an occupied space");
			return 0;
		}
		
		// movement must be diagonal
		var rowDelta = Math.abs(fromY - toY);
		var colDelta = Math.abs(fromX - toX);
		if (rowDelta != colDelta) {
			if (!s) computerSay("Movement must be diagonal");
			return 0;
		}
		
		// men can't move backwards
		if (Math.abs(this.gamestate[fromX][fromY]) != 2) {
			if (player == this.red && toY < fromY) {
				if (!s) computerSay("Non-kings can't move backwards");
				return 0;
			}
			if (player == this.white && toY > fromY) {
				if (!s) computerSay("Non-kings can't move backwards");
				return 0;
			}
		}
		
		// validate a jump
		if (rowDelta > 1) {
			if (rowDelta > 2) {
				if (!s) computerSay("You can't move more than 2 spaces");
				return 0;
			}
			if (!this.isValidCapture(player, fromX, fromY, toX, toY)) {
				if (!s) computerSay("You can only move 2 spaces by capturing an opponent's piece");
				return 0;
			}
			return 2;
		}
		
		// are there captures available?
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (Math.sign(this.gamestate[i][j]) == player && this.canCapture(player, i, j)) {
					if (!s) computerSay("If you can capture a piece you must");
					return 0;
				}
			}
		}
		return 1;
	},
	
	isValidCapture: function(player, fromX, fromY, toX, toY) {
		var middleX = (fromX + toX) / 2;
		var middleY = (fromY + toY) / 2;
		return (Math.sign(this.gamestate[middleX][middleY]) != 0 && Math.sign(this.gamestate[middleX][middleY]) != player && this.gamestate[toX][toY] == 0);
	},
	
	canCapture: function(player, x, y) {
		return (x > 1 && y > 1 && (Math.abs(this.gamestate[x][y]) == 2 || player == this.white) && this.isValidCapture(player, x, y, x - 2, y - 2)) || // up left
		       (x < 6 && y > 1 && (Math.abs(this.gamestate[x][y]) == 2 || player == this.white) && this.isValidCapture(player, x, y, x + 2, y - 2)) || // up right
			   (x > 1 && y < 6 && (Math.abs(this.gamestate[x][y]) == 2 || player == this.red) && this.isValidCapture(player, x, y, x - 2, y + 2)) ||   // down left
			   (x < 6 && y < 6 && (Math.abs(this.gamestate[x][y]) == 2 || player == this.red) && this.isValidCapture(player, x, y, x + 2, y + 2))      // down right
	},
	
	// returns 0 on fail, 1 on success, 2 on success with multiturn
	move: function(player, fromX, fromY, toX, toY) {
		var v = this.validateMove(player, fromX, fromY, toX, toY);
		if (v == 0) return 0;
		if (v == 1) {
			// king me
			if (player == this.white && toY == 0) {
				this.gamestate[toX][toY] = this.whiteKing;
			} else if (player == this.red && toY == 7) {
				this.gamestate[toX][toY] = this.redKing;
			} else {
				this.gamestate[toX][toY] = this.gamestate[fromX][fromY];
			}
			this.gamestate[fromX][fromY] = 0;
			return 1;
		}
		if (v == 2) {
			// king me
			if (player == this.white && toY == 0) {
				this.gamestate[toX][toY] = this.whiteKing;
			} else if (player == this.red && toY == 7) {
				this.gamestate[toX][toY] = this.redKing;
			} else {
				this.gamestate[toX][toY] = this.gamestate[fromX][fromY];
			}
			
			this.gamestate[(fromX + toX) / 2][(fromY + toY) / 2] = 0;
			this.gamestate[fromX][fromY] = 0;
			if (this.canCapture(player, toX, toY)) {
				this.multiturn = true;
				return 2;
			}
			return 1;
		}
	},
	
	// returns 1 if red wins, -1 if white wins, 0 otherwise
	checkWin: function() {
		var noRed = true;
		var noWhite = true;
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (this.gamestate[i][j] < 0) noWhite = false;
				if (this.gamestate[i][j] > 0) noRed = false;
			}
		}
		if (noRed && noWhite) {
			computerSay("Something went horribly wrong, you both lost!");
			return 0;
		}
		if (noRed) {
			return this.white;
		}
		if (noWhite) {
			return this.red;
		}
		return 0;
	},
	
	// return every possible move for a player
	getMoves: function(player) {
		var moves = [];
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (Math.sign(this.gamestate[i][j]) == player) {
					// add the hops
					if (i > 0 && j > 0 && this.validateMove(player, i, j, i - 1, j - 1, true)) { // up left hop
						moves.push({fromX: i, fromY: j, toX: i - 1, toY: j - 1});
					}
					if (i < 7 && j > 0 && this.validateMove(player, i, j, i + 1, j - 1, true)) { // up right hop
						moves.push({fromX: i, fromY: j, toX: i + 1, toY: j - 1});
					}
					if (i > 0 && j < 7 && this.validateMove(player, i, j, i - 1, j + 1, true)) { // down left hop
						moves.push({fromX: i, fromY: j, toX: i - 1, toY: j + 1});
					}
					if (i < 7 && j < 7 && this.validateMove(player, i, j, i + 1, j + 1, true)) { // down right hop
						moves.push({fromX: i, fromY: j, toX: i + 1, toY: j + 1});
					}
					
					// add the jumps
					if (i > 1 && j > 1 && this.validateMove(player, i, j, i - 2, j - 2, true)) { // up left jump
						moves.push({fromX: i, fromY: j, toX: i - 2, toY: j - 2});
					}
					if (i < 6 && j > 1 && this.validateMove(player, i, j, i + 2, j - 2, true)){ // up right
						moves.push({fromX: i, fromY: j, toX: i + 2, toY: j - 2});
					}
					if (i > 1 && j < 6 && this.validateMove(player, i, j, i - 2, j + 2, true)) { // down left
						moves.push({fromX: i, fromY: j, toX: i - 2, toY: j + 2});
					}
					if (i < 6 && j < 6 && this.validateMove(player, i, j, i + 2, j + 2, true)) { // down right
						moves.push({fromX: i, fromY: j, toX: i + 2, toY: j + 2});
					}
				}
			}
		}
		return moves;
	}
};









/*=====================================*\
				MiniMax
\*=====================================*/
var MiniMax = function(difficulty) {
	this.bestMove = {fromX: undefined, fromY: undefined, toX: undefined, toY: undefined};
	this.MAX_DEPTH = difficulty;
};

MiniMax.prototype = {
	// called from the game, returns the best move
	buildTree: function(board, player, cb) {
		this.bestMove = {fromX: undefined, fromY: undefined, toX: undefined, toY: undefined};
		var alpha = this.buildTree_r(board, player, 0);
		cb(this.bestMove);
	},
	
	// recursive function to build the MiniMax tree and rate the value of the board
	buildTree_r: function(board, currPlayer, depth) {
		if (depth > this.MAX_DEPTH) {
			// return the number of pieces the current player has if you reach max depth before a win
			var pieces = 0;
			for (var i = 0; i < 8; i++) {
				for (var j = 0; j < 8; j++) {
					if (Math.sign(board.gamestate[i][j]) == currPlayer) {
						pieces++
					}
				}
			}
			return pieces;
		}
		
		// set the other player 
		var otherPlayer;
		if (currPlayer == board.white) otherPlayer = board.red;
		else otherPlayer = board.white;
		
		// check for a winner. If currPlayer we win, otherwise we lose in this tree
		var winner = board.checkWin();
		if (winner == currPlayer) {
			return 1000;
		} else if (winner == otherPlayer) {
			return -1000;
		}
		
		// this is where we begin to rank moves, get an array of moves, set alpha low, instantiate parallel
		var moveList = board.getMoves(currPlayer);
		var alpha = -1000;
		var subAlphaList = [];
		for (var i = 0; i < moveList.length; i++) {
			var boardCopy = board.copy(); // copy current gamestate
			boardCopy.move(currPlayer, moveList[i].fromX, moveList[i].fromY, moveList[i].toX, moveList[i].toY); // try each possible move
			
			var subAlpha = -this.buildTree_r(boardCopy, otherPlayer, depth + 1); // pass new gamestate into recursion
			if (alpha < subAlpha) { // if this move is better than alpha increase alpha
				alpha = subAlpha;
			}
			
			if (depth == 0) { // if we're looking at the real gamestate add subAlpha to the listStyleType
				subAlphaList.push(subAlpha);
			}
		}
		
		if (depth == 0) {
			var posMoves = [];
			for (var n = 0; n < subAlphaList.length; n++) {
				if (subAlphaList[n] == alpha) {
					posMoves.push(moveList[n]);
				}
			}
			this.bestMove = posMoves[Math.floor(Math.random() * posMoves.length)]; // pick a random best move
		}
		
		return alpha;
	}
};







/*====================================*\
               Canvas UI
\*====================================*/
var initUI = function() {
	// fill with checkerboard squares
	for (var row = 0; row < 8; row++) {
		for (var col = 0; col < 8; col++) {
			if (row % 2 == col % 2) ctx.fillStyle = '#dddddd';
			else ctx.fillStyle = '#999999';
			ctx.fillRect(col * 60, row * 60, 60, 60);
		}
	}
};

var update = function() {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			var posX = i * 60 + 30;
			var posY = j * 60 + 30;
			if (b.gamestate[i][j] == b.redMan) {
				drawMan(posX, posY, "red");
			} else if (b.gamestate[i][j] == b.whiteMan) {
				drawMan(posX, posY, "white");
			} else if (b.gamestate[i][j] == b.redKing) {
				drawKing(posX, posY, "red");
			} else if (b.gamestate[i][j] == b.whiteKing) {
				drawKing(posX, posY, "white");
			} else { // empty
				if (j % 2 == i % 2) ctx.fillStyle = '#dddddd';
				else ctx.fillStyle = '#999999';
				ctx.fillRect(posX - 30, posY - 30, 60, 60);
			}
		}
	}
	if (selected.x != undefined) {
		if (currentPlayer == b.red) {
			var color = "red";
		} else if (currentPlayer == b.white) {
			var color = "white";
		}
		drawSelected(selected.x * 60 + 30, selected.y * 60 + 30, color);
	};
};

var drawMan = function(x, y, color) {
	ctx.beginPath();
	ctx.arc(x, y, 23, 0, Math.PI * 2, false);
	ctx.lineWidth = 4;
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
};

var drawKing = function(x, y, color) {
	ctx.beginPath();
	ctx.arc(x, y, 23, 0, Math.PI * 2, false);
	ctx.lineWidth = 4;
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(x, y, 16, 0, Math.PI * 2, false);
	ctx.lineWidth = 3;
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2, false);
	ctx.lineWidth = 3;
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
};

var drawSelected = function(x, y, color) {
	ctx.beginPath();
	ctx.arc(x, y, 23, 0, Math.PI * 2, false);
	ctx.lineWidth = 4;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
};


