/* (C) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

var MiniMax = function(){
	//init values and options
	this.bestMove = 0;
	this.MAX_DEPTH = 6;
}

MiniMax.prototype = {
	// function called from game, bestmove will return the computer move
	buildTree: function(board, player, cb) {
		this.bestMove = 0;
		var alpha = this.buildTree_r(board, player, 0);
		cb(this.bestMove);
	},

	// recursive function to build minimax tree and rate the value of the
	// board
	buildTree_r: function(board, currPlayer, depth) {
		if (depth > this.MAX_DEPTH) {
			return 0;
		}
		
		// Set the otherplayer for the next game state and check for
		// loss
		var otherPlayer;
		if (currPlayer == board.X) {
			otherPlayer = board.O;
		} else {
			otherPlayer = board.X;
		}
		
		// check for a winner in the boardstate
		// if currPlayer then we win, otherwise we lose in this tree
		var winner = board.getWinner();
		if (winner == currPlayer) {
			return 1;
		} else if(winner == otherPlayer){
			return -1;
		}
		
		// check for a full board, if so game is a draw
		if (board.isFull()) {
			return 0;
		}
		
		// this is where we begin to rank moves
		// get an array of moves, set alpha low, and instantiate 
		// parallel subAlpha list to movelist so we can remember move
		// ranks
		var moveList = board.getMoves();
		var alpha = -1;
		var saList = [];
		for (var i = 0; i < moveList.length; i++) {
 			// copy current gamestate
			var boardCopy = board.copy();
			// make a move for each possible move in the gamestate
			boardCopy.move(currPlayer, moveList[i]);

			//pass new gamestate into recursion
			var subalpha = -this.buildTree_r(boardCopy, otherPlayer,
				depth + 1); 
			// if move is better than alpha, increase alpha
			if (alpha < subalpha) { 
				alpha = subalpha;
			}
			// push subalpha to the list only if we're looking at a
			// 'real' gamestate
			if (depth == 0) { 
				saList.push(subalpha);
			}
		}
		
		if (depth == 0) {
			var posMoves = [];
			for (var n = 0; n < saList.length; n++) {
				if (saList[n] == alpha) {
					posMoves.push(moveList[n]);
				}
			}
			// in future pick a random move
			this.bestMove = this.rand(posMoves);
		}
		return alpha;
	},
	
	rand: function(list){
		var item = list[Math.floor(Math.random() * list.length)];
		return item;
	}
}
	
var Board = function(){
	this.empty = 0;
	this.X = 1;
	this.O = 2;
	this.wins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	this.gamestate = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

Board.prototype = {
	copy: function() {
		var b = new Board();
		for (var i = 0; i < 9; i++) {
			b.gamestate[i] = this.gamestate[i];
		}
		return b;
	},
	
	move: function(player, pos) {
		this.gamestate[pos] = player;
	},
	
	getMoves: function() {
		var moves = [];
		for (var i = 0; i < 9; i++) {
			if (this.gamestate[i] == this.empty) {
				moves.push(i);
			}
		}
		return moves;
	},
	
	isFull: function() {
		for(var i = 0; i < 9; i++){
			if (this.gamestate[i] == this.empty) {
				return false;
			}
		}
		return true;
	},
	
	getWinner: function() {
		for (var i = 0; i < this.wins.length; i++) {
			var a, b ,c;
			a = this.gamestate[this.wins[i][0]];
			b = this.gamestate[this.wins[i][1]];
			c = this.gamestate[this.wins[i][2]];

			if(a == b && a == c && a != this.empty){
				return a;
			}
		}
		return this.empty;
	}
}

var b; // global variable to store the board
var firstTime = false;; // so that we only set the listeners once

$(document).ready(function() {
	initializeButtons();
	start();
});

var start = function() {
	$('.square').css('color', '#3066b3');
	$('.square').text('a');
	
	// initialize board and minimax
	b = new Board();
	m = new MiniMax();
	
	computerSay("Who should go first?");

	// initialize click functions after brief delay so they're more obvious
	setTimeout(function() {
		showSelectionButtons();
	}, 100);
};

var showSelectionButtons = function() {
	$('#me-first').show();
	
	$('#computer-first').show();
};


var go = function() {
	// timeout is necessary to prevent concurrency issues
	setTimeout(computerMove, 1);
};

var computerMove = function() {
	m.buildTree(b, b.X, function(bestMove) {
		realMove(b.X, bestMove);
	});
};

var checkGameEnd = function(prevPlayer) {
	var winner = b.getWinner();
	if (winner) {
		if (winner == b.X) {
			computerSay("I win!");
			$('#board').children().off("click");
			$('#play-again').show();
			return b.X;
		} else if (winner == b.O) {
			computerSay("Whoa, you won!");
			$('#board').children().off("click");
			$('#play-again').show();
			return b.O;
		}
	} else if (b.isFull()) {
		computerSay("The game's a draw, too bad");
		$('#board').children().off("click");
		$('#play-again').show();
		return 3;
	} else if (prevPlayer == b.X) {
		computerSay("Your move");
	}
	return 0;
};

var realMove = function(player, pos) {
	b.move(player, pos);
	updateDisplay();
	return checkGameEnd(player);
};

var updateDisplay = function() {
	for (var i = 0; i < 9; i++) {
		if (b.gamestate[i] == b.X) {
			$('.square').eq(i).text('X').css('color', '#eeeeee');
		} else if (b.gamestate[i] == b.O) {
			$('.square').eq(i).text('O').css('color', '#eeeeee');
		}
	}
};

var computerSay = function(string) {
	$('#log').append("<p>" + string + "</p>");
	$('#log').scrollTop($('#log')[0].scrollHeight);
};

var initializeBoard = function() {
	$('#sq_1').click(function() {
		squareClick(0);
	});
	
	$('#sq_2').click(function() {
		squareClick(1);
	});
	
	$('#sq_3').click(function() {
		squareClick(2);
	});
	
	$('#sq_4').click(function() {
		squareClick(3);
	});
	
	$('#sq_5').click(function() {
		squareClick(4);
	});
	
	$('#sq_6').click(function() {
		squareClick(5);
	});
	
	$('#sq_7').click(function() {
		squareClick(6);
	});
	
	$('#sq_8').click(function() {
		squareClick(7);
	});
	
	$('#sq_9').click(function() {
		squareClick(8);
	});
}

// set all click functions for buttons
var initializeButtons = function() {
	$('#me-first').click(function() {
		$('#me-first').hide();
		$('#computer-first').hide();
		if (!firstTime) initializeBoard();
		computerSay("Go ahead");
	});
	
	$('#computer-first').click(function() {
		$('#me-first').hide();
		$('#computer-first').hide();
		computerSay("Okay, I'll go first");
		if (!firstTime) initializeBoard();
		go();
	});

	$('#play-again').click(function() {
		$('#log').html('');
		$('#play-again').hide();
		start();
	});
};

// human player makes a move
var squareClick = function(n) {
	if (b.gamestate[n]) {
		computerSay("Hey, that's an illegal move!");
	}
	else {
		var over = realMove(b.O, n);
		if (!over) go();
	}
};
