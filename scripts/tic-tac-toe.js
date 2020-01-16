/* (C) 2020 Joseph Petitti | https://josephpetitti.com/license.txt */
var pX = 1;
var pO = 2;
var pEmpty = 0;
var Board = /** @class */ (function () {
    function Board() {
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
        this.gameState = new Array(9);
        for (var i = 0; i < this.gameState.length; ++i) {
            this.gameState[i] = pEmpty;
        }
    }
    /**
     * @return a deep copy of this board
     */
    Board.prototype.copy = function () {
        var b = new Board();
        this.gameState.forEach(function (g, i) {
            b.gameState[i] = g;
        });
        return b;
    };
    /**
     * make a move
     * @param player the player making the move
     * @param pos the position the player is placing a mark at
     */
    Board.prototype.move = function (player, pos) {
        this.gameState[pos] = player;
    };
    /**
     * @return true if all squares of the board are filled
     */
    Board.prototype.isFull = function () {
        for (var _i = 0, _a = this.gameState; _i < _a.length; _i++) {
            var g = _a[_i];
            if (g === pEmpty)
                return false;
        }
        return true;
    };
    /**
     * @return the player who has won, or pEmpty if no player has won
     */
    Board.prototype.getWinner = function () {
        for (var _i = 0, _a = this.wins; _i < _a.length; _i++) {
            var w = _a[_i];
            var a = this.gameState[w[0]];
            var b_1 = this.gameState[w[1]];
            var c = this.gameState[w[2]];
            if (a === b_1 && a === c)
                return a;
        }
        return pEmpty;
    };
    /**
     * @return a list of all empty squares on the board
     */
    Board.prototype.getAvailableMoves = function () {
        var out = new Array();
        for (var i = 0; i < this.gameState.length; ++i) {
            if (this.gameState[i] === pEmpty) {
                out.push(i);
            }
        }
        return out;
    };
    return Board;
}());
var MiniMax = /** @class */ (function () {
    function MiniMax() {
        this.bestMove = 0;
        this.MAX_DEPTH = 6;
    }
    MiniMax.prototype.buildTree = function (board, player, cb) {
        this.bestMove = 0;
        this.recursiveBuildTree(board, player, 0);
        cb(this.bestMove);
    };
    MiniMax.prototype.recursiveBuildTree = function (board, currPlayer, depth) {
        if (depth > this.MAX_DEPTH) {
            return 0;
        }
        // set the other player for the next game state and check for loss
        var otherPlayer = currPlayer === pX ? pO : pX;
        // check to see if someone has won in the current boardstate
        var winner = board.getWinner();
        if (winner === currPlayer) {
            return 1;
        }
        else if (winner === otherPlayer) {
            return -1;
        }
        // check for a full board, if so the game is a draw
        if (board.isFull()) {
            return 0;
        }
        // now we start to rank moves
        var alpha = -1;
        var saList = new Array();
        var moveList = board.getAvailableMoves();
        for (var _i = 0, moveList_1 = moveList; _i < moveList_1.length; _i++) {
            var m_1 = moveList_1[_i];
            // copy current gamestate
            var boardCopy = board.copy();
            // make a branch for each possible move
            boardCopy.move(currPlayer, m_1);
            // pass the new game state into recursion
            var subalpha = -this.recursiveBuildTree(boardCopy, otherPlayer, depth + 1);
            // if this move is better than alpha increase alpha
            if (alpha < subalpha)
                alpha = subalpha;
            // push subalpha to the list only if we're looking at a 'real' game state
            if (depth === 0)
                saList.push(subalpha);
        }
        if (depth === 0) {
            var posMoves = new Array();
            for (var j = 0; j < saList.length; ++j) {
                if (saList[j] === alpha) {
                    posMoves.push(moveList[j]);
                }
            }
            // pick a random best move
            this.bestMove = posMoves[Math.floor(Math.random() * posMoves.length)];
        }
        return alpha;
    };
    return MiniMax;
}());
var b; // global variable to store the real board
var humanPlayer = pX;
var computerPlayer = pO;
var m; // global variable for single MiniMax object
var allowPlayerMoves = false;
/**
 * @return a player if someone won, "draw" if a draw, or pEmpty if neither
 */
var checkForWin = function () {
    var winner = b.getWinner();
    if (winner === humanPlayer) {
        allowPlayerMoves = false;
        alert("You won somehow!"); // TODO fix
        document.getElementById("play-again").style.display = "block";
    }
    else if (winner === computerPlayer) {
        allowPlayerMoves = false;
        alert("Computer won"); // TODO fix
        document.getElementById("play-again").style.display = "block";
    }
    else {
        // no winner, check for draw
        if (b.isFull()) {
            allowPlayerMoves = false;
            alert("It's a draw"); // TODO fix
            document.getElementById("play-again").style.display = "block";
            return "draw";
        }
    }
    return winner;
};
var updateDisplay = function () {
    for (var i = 0; i < b.gameState.length; ++i) {
        var letter = " ";
        if (b.gameState[i] === pX)
            letter = "X";
        else if (b.gameState[i] === pO)
            letter = "O";
        document.getElementById("sq_" + i).innerText = letter;
    }
};
var computerMove = function () {
    m.buildTree(b, computerPlayer, function (bestMove) {
        b.move(computerPlayer, bestMove);
        updateDisplay();
        // if no one has won, let the player move again
        if (checkForWin() === pEmpty) {
            allowPlayerMoves = true;
        }
    });
};
/**
 * @param elt the square element clicked on
 */
var squareClick = function (elt) {
    if (allowPlayerMoves) {
        var n = elt.id.slice(-1);
        if (b.gameState[n] === pEmpty) {
            b.move(humanPlayer, n);
            updateDisplay();
            allowPlayerMoves = false;
            // if no one has won, let the computer move
            if (checkForWin() === pEmpty)
                setTimeout(computerMove, 300);
        }
    }
};
/**
 * sets up the Board and MiniMax objects
 */
var prepareGame = function () {
    // initialize new Board and MiniMax
    b = new Board();
    m = new MiniMax();
    // display selection buttons
    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < squares.length; ++i) {
        squares[i].style.backgroundColor = "#2e3236";
    }
    document.getElementById("center-buttons").style.display = "flex";
    document.getElementById("play-again").style.display = "none";
    updateDisplay();
    allowPlayerMoves = false;
};
/**
 * Adds all event listeners. Should only be called once, when the document is
 * first loaded
 */
var initializeListeners = function () {
    document.getElementById("me-first").addEventListener("click", function (ev) {
        document.getElementById("center-buttons").style.display = "none";
        var squares = document.getElementsByClassName("square");
        for (var i = 0; i < squares.length; ++i) {
            squares[i].style.backgroundColor = "#3066b3";
        }
        humanPlayer = pX;
        computerPlayer = pO;
        allowPlayerMoves = true;
    });
    document.getElementById("computer-first").addEventListener("click", function (ev) {
        document.getElementById("center-buttons").style.display = "none";
        var squares = document.getElementsByClassName("square");
        for (var i = 0; i < squares.length; ++i) {
            squares[i].style.backgroundColor = "#3066b3";
        }
        humanPlayer = pO;
        computerPlayer = pX;
        allowPlayerMoves = false;
        setTimeout(computerMove, 300);
    });
    document.getElementById("play-again").addEventListener("click", function (ev) {
        document.getElementById("play-again").style.display = "none";
        prepareGame();
    });
    for (var i = 0; i < 9; ++i) {
        document.getElementById("sq_" + i).addEventListener("click", function (ev) {
            squareClick(ev.target);
        });
    }
};
window.addEventListener("load", function () {
    initializeListeners();
    prepareGame();
});
