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
        row.push(`[${j}]`);
      }
      board.push(row);
    }

    board.forEach((row) => {
      console.log(row.join(" "));
    });

    return board;
  }
  /*  buildChessBoard() {
      const arr = [
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
      ];
      return arr;
    }
      */
}

const chess = new ChessBoard();

chess.board;
