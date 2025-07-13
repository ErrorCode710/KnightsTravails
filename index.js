class Knight {
  constructor() {}
}
class ChessBoard {
  constructor() {
    this.board = this.buildChessBoard();
  }

  buildChessBoard() {
    const board = [];
    for (let i = 0; i <= 7; i++) {
      const row = [];
      for (let j = 0; j <= 7; j++) {
        row.push(`[${0}]`);
      }
      board.push(row);
    }

    return board;
  }
  move(x, y) {
    if (x > 7 || y > 7) {
      console.log("Invalid Move");
      return;
    }
    this.board[x][y] = `[K]`;

    this.print(this.board);
  }
  print(arr) {
    arr.forEach((row) => {
      console.log(row.join(" "));
    });
  }
  legalMoves(y, x) {
    //current move [4,3] = [5,5]
    // lets make constrains
    // right path
    console.log(`Current Knight Position ${y} ${x}`);
    this.move(y, x);
    const moves = [];

    // this.board[x + 2][y + 1];
    // this.board[x + 2][y - 1];

    // // down path
    // this.board[x + 1][y + 2];
    // this.board[x - 1][y + 2];

    // // left path
    // this.board[x - 2][y + 1];
    // this.board[x - 2][y - 1];

    if (x > 1 && y > 1 && x < 6 && y < 6) {
      console.log("Probably center");
      // this.board[x - 2][y + 1];
      // this.board[x - 2][y - 1];
      //left
      moves.push([y - 2, x + 1], [y - 2, x - 1]);
      //right path
      moves.push([y + 2, x + 1], [y + 2, x - 1]);
      //up path
      // moves.push([y + 1, x - 2], [y - 1, x - 2]);
      moves.push([y - 2, x + 1], [y - 2, x - 1]);
      //down path
      moves.push([y + 1, x + 2], [y - 1, x + 2]);
    }
    // for 0 -> 1
    if (x >= 1 && y >= 1) {
      //down path
      //[2,3]
      moves.push([y + 1, x + 2], [y - 1, x + 2]);
      moves.push([y + 2, x + 1], [y + 2, x - 1]);
      moves.push([y - 2, x + 1], [y - 2, x - 1]);
    } else if (x >= 0 && y >= 1) console.log(moves);
    for (const [y, x] of moves) {
      console.log(y, x);
      this.move(y, x);
    }
    // return moves;

    // if (x < 0) {
    // }
    // // up path
    // this.board[x + 2][y - 1];
    // this.board[x - 2][y - 1];
  }
}

const chess = new ChessBoard();

chess.move(1, 8);
chess.board;
chess.legalMoves(3, 1);
