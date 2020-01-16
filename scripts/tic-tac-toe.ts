/* (C) 2020 Joseph Petitti | https://josephpetitti.com/license.txt */

type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Player = 1 | 2 | 0;
const pX: Player = 1;
const pO: Player = 2;
const pEmpty: Player = 0;

class Board {
  private wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  public gameState: Array<Player>;

  constructor() {
    this.gameState = new Array<Player>(9);
    for (let i = 0; i < this.gameState.length; ++i) {
      this.gameState[i] = pEmpty;
    }
  }

  /**
   * @return a deep copy of this board
   */
  public copy(): Board {
    const b = new Board();
    this.gameState.forEach((g, i) => {
      b.gameState[i] = g;
    });
    return b;
  }

  /**
   * make a move
   * @param player the player making the move
   * @param pos the position the player is placing a mark at
   */
  public move(player: Player, pos: BoardPosition) {
    this.gameState[pos] = player;
  }

  /**
   * @return true if all squares of the board are filled
   */
  public isFull() {
    for (const g of this.gameState) {
      if (g === pEmpty) return false;
    }
    return true;
  }

  /**
   * @return the player who has won, or pEmpty if no player has won
   */
  public getWinner(): Player {
    for (const w of this.wins) {
      const a = this.gameState[w[0]];
      const b = this.gameState[w[1]];
      const c = this.gameState[w[2]];
      if (a === b && a === c) return a;
    }
    return pEmpty;
  }

  /**
   * @return a list of all empty squares on the board
   */
  public getAvailableMoves(): BoardPosition[] {
    const out = new Array<BoardPosition>();
    for (let i = 0 as BoardPosition; i < this.gameState.length; ++i) {
      if (this.gameState[i] === pEmpty) {
        out.push(i);
      }
    }
    return out;
  }
}

class MiniMax {
  private bestMove: BoardPosition = 0;
  private MAX_DEPTH = 6;

  public buildTree(
    board: Board,
    player: Player,
    cb: (bestMove: BoardPosition) => void
  ) {
    this.bestMove = 0;
    this.recursiveBuildTree(board, player, 0);
    cb(this.bestMove);
  }

  public recursiveBuildTree(board: Board, currPlayer: Player, depth: number) {
    if (depth > this.MAX_DEPTH) {
      return 0;
    }

    // set the other player for the next game state and check for loss
    const otherPlayer = currPlayer === pX ? pO : pX;

    // check to see if someone has won in the current boardstate
    const winner = board.getWinner();
    if (winner === currPlayer) {
      return 1;
    } else if (winner === otherPlayer) {
      return -1;
    }

    // check for a full board, if so the game is a draw
    if (board.isFull()) {
      return 0;
    }

    // now we start to rank moves
    let alpha = -1;
    const saList = new Array<number>();
    const moveList = board.getAvailableMoves();
    for (const m of moveList) {
      // copy current gamestate
      const boardCopy = board.copy();
      // make a branch for each possible move
      boardCopy.move(currPlayer, m);

      // pass the new game state into recursion
      const subalpha = -this.recursiveBuildTree(
        boardCopy,
        otherPlayer,
        depth + 1
      );

      // if this move is better than alpha increase alpha
      if (alpha < subalpha) alpha = subalpha;

      // push subalpha to the list only if we're looking at a 'real' game state
      if (depth === 0) saList.push(subalpha);
    }

    if (depth === 0) {
      const posMoves = new Array<BoardPosition>();
      for (let j = 0; j < saList.length; ++j) {
        if (saList[j] === alpha) {
          posMoves.push(moveList[j]);
        }
      }
      // pick a random best move
      this.bestMove = posMoves[Math.floor(Math.random() * posMoves.length)];
    }
    return alpha;
  }
}

let b: Board; // global variable to store the real board
let humanPlayer: Player = pX;
let computerPlayer: Player = pO;
let m: MiniMax; // global variable for single MiniMax object
let allowPlayerMoves = false;

/**
 * @return a player if someone won, "draw" if a draw, or pEmpty if neither
 */
const checkForWin = (): Player | "draw" => {
  const winner = b.getWinner();
  if (winner === humanPlayer) {
    allowPlayerMoves = false;
    alert("You won somehow!"); // TODO fix
    document.getElementById("play-again").style.display = "block";
  } else if (winner === computerPlayer) {
    allowPlayerMoves = false;
    alert("Computer won"); // TODO fix
    document.getElementById("play-again").style.display = "block";
  } else {
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

const updateDisplay = () => {
  for (let i = 0; i < b.gameState.length; ++i) {
    let letter = " ";
    if (b.gameState[i] === pX) letter = "X";
    else if (b.gameState[i] === pO) letter = "O";
    document.getElementById("sq_" + i).innerText = letter;
  }
};

const computerMove = () => {
  m.buildTree(b, computerPlayer, bestMove => {
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
const squareClick = (elt: HTMLElement) => {
  if (allowPlayerMoves) {
    const n = elt.id.slice(-1);
    if (b.gameState[n] === pEmpty) {
      b.move(humanPlayer, (n as unknown) as BoardPosition);
      updateDisplay();
      allowPlayerMoves = false;
      // if no one has won, let the computer move
      if (checkForWin() === pEmpty) setTimeout(computerMove, 300);
    }
  }
};

/**
 * sets up the Board and MiniMax objects
 */
const prepareGame = () => {
  // initialize new Board and MiniMax
  b = new Board();
  m = new MiniMax();

  // display selection buttons
  const squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; ++i) {
    (squares[i] as HTMLElement).style.backgroundColor = "#2e3236";
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
const initializeListeners = () => {
  document.getElementById("me-first").addEventListener("click", ev => {
    document.getElementById("center-buttons").style.display = "none";
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; ++i) {
      (squares[i] as HTMLElement).style.backgroundColor = "#3066b3";
    }
    humanPlayer = pX;
    computerPlayer = pO;
    allowPlayerMoves = true;
  });

  document.getElementById("computer-first").addEventListener("click", ev => {
    document.getElementById("center-buttons").style.display = "none";
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; ++i) {
      (squares[i] as HTMLElement).style.backgroundColor = "#3066b3";
    }
    humanPlayer = pO;
    computerPlayer = pX;
    allowPlayerMoves = false;
    setTimeout(computerMove, 300);
  });

  document.getElementById("play-again").addEventListener("click", ev => {
    document.getElementById("play-again").style.display = "none";
    prepareGame();
  });

  for (let i = 0; i < 9; ++i) {
    document.getElementById("sq_" + i).addEventListener("click", ev => {
      squareClick(ev.target as HTMLElement);
    });
  }
};

window.addEventListener("load", () => {
  initializeListeners();
  prepareGame();
});
