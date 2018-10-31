/* (C) 2018 Joseph Petitti | https://josephpetitti.com/license.txt */

var MiniMax = function(){
	//init values and options
	this.bestMove = 0;
	this.MAX_DEPTH = 6;
}

MiniMax.prototype = {
	//function called from game, bestmove will return the computer move
	buildTree: function(board, player, cb){
		this.bestMove = 0;
		var alpha = this.buildTree_r(board, player, 0);
		cb(this.bestMove);
	},

	//recursive function to build minimax tree and rate the value of the board
	buildTree_r: function(board, currPlayer, depth){
		if(depth > this.MAX_DEPTH){
			return 0;
		}
		
		//Set the otherplayer for the next game state and to check for loss
		var otherPlayer;
		if(currPlayer == board.X){
			otherPlayer = board.O;
		} else {
			otherPlayer = board.X;
		}
		
		//check for a winner in the boardstate, if currPlayer we win, else we lose in this tree
		var winner = board.getWinner();
		if(winner == currPlayer){
			return 1;
		} else if(winner == otherPlayer){
			return -1;
		}
		
		//check for a full board and therefore cats game in this true
		if(board.isFull()){
			return 0;
		}
		
		//this is where we begin to rank moves, get an array of moves, set alpha low, instantiate parallel
		//subAlpha list  to movelist to remember move ranks
		var moveList = board.getMoves();
		var alpha = -1;
		var saList = [];
		for(var i=0; i<moveList.length; i++){

			var boardCopy = board.copy(); //Copy current gamestate
			boardCopy.move(currPlayer, moveList[i]); //Make a move for in the gamestate for each possible move
			//console.log(boardCopy.gamestate);

			var subalpha = -this.buildTree_r(boardCopy, otherPlayer, depth + 1); //pass new gamestate into recursion
			if(alpha < subalpha){ //if move is better than alpha, increase alpha
				alpha = subalpha;
			}
			if(depth == 0){ //only if we are looking at REAL gamestate do we push an alpha to the list
				saList.push(subalpha);
			}
		}
		
		if(depth == 0){
			var posMoves = [];
			for(var n=0; n<saList.length; n++){
				if(saList[n] == alpha){
					posMoves.push(moveList[n]);
				}
			}
			this.bestMove = this.rand(posMoves); //in future pick random..
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
	copy: function(){
		var b = new Board();
		for(var i = 0; i < 9; i++){
			b.gamestate[i] = this.gamestate[i];
		}
		return b;
	},
	
	move: function(player, pos){
		this.gamestate[pos] = player;
	},
	
	getMoves: function(){
		var moves = [];
		for(var i = 0; i < 9; i++){
			if(this.gamestate[i] == this.empty){
				moves.push(i);
			}
		}
		return moves;
	},
	
	isFull: function(){
		for(var i = 0; i < 9; i++){
			if(this.gamestate[i] == this.empty){
				return false;
			}
		}
		return true;
	},
	
	getWinner: function(){
		for(var i = 0; i < this.wins.length; i++){
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





var b;

$(document).ready(function() {
	$('.square').text('a');
	
	// initialize board and minimax
	b = new Board();
	m = new MiniMax();
	
	computerSay("Who should go first?");

	// initialize click functions
	$('#me-first').show().click(function() {
		$('#me-first').hide();
		$('#computer-first').hide();
		initializeBoard();
		computerSay("Go ahead");
	});
	
	$('#computer-first').show().click(function() {
		$('#me-first').hide();
		$('#computer-first').hide();
		initializeBoard();
		computerSay("Okay, I'll go first");
		go();
	});
});

function go() {
	setTimeout(computerMove, 1);
}

function computerMove() {
	m.buildTree(b, b.X, function(bestMove) {
		realMove(b.X, bestMove);
	});
}

function checkGameEnd(prevPlayer) {
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
}

function realMove(player, pos) {
	b.move(player, pos);
	updateDisplay();
	return checkGameEnd(player);
}

function updateDisplay() {
	for (var i = 0; i < 9; i++) {
		if (b.gamestate[i] == b.X) {
			$('.square').eq(i).text('X').css('color', 'black');
		} else if (b.gamestate[i] == b.O) {
			$('.square').eq(i).text('O').css('color', 'black');
		}
	}
}

function computerSay(string) {
	$('#log').append("<p>" + string + "</p>");
	$('#log').scrollTop($('#log')[0].scrollHeight);
}

// set all click functions and hide buttons
function initializeBoard() {
	$('#top-left').click(function() {
		squareClick(0);
	});
	
	$('#top').click(function() {
		squareClick(1);
	});
	
	$('#top-right').click(function() {
		squareClick(2);
	});
	
	$('#left').click(function() {
		squareClick(3);
	});
	
	$('#center').click(function() {
		squareClick(4);
	});
	
	$('#right').click(function() {
		squareClick(5);
	});
	
	$('#bottom-left').click(function() {
		squareClick(6);
	});
	
	$('#bottom').click(function() {
		squareClick(7);
	});
	
	$('#bottom-right').click(function() {
		squareClick(8);
	});
	
	$('#play-again').click(function() {
		location.reload();
	});
	
}

// human player makes a move
function squareClick(n) {
	if (b.gamestate[n]) {
		computerSay("Hey, that's an illegal move!");
	}
	else {
		var over = realMove(b.O, n);
		if (!over) go();
	}
}
