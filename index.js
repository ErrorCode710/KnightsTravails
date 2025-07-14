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
    console.log(`Current Knight Position ${y} ${x}`);
    // this.move(y, x);
    const moves = [];
    const directions = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];

    for (const [dy, dx] of directions) {
      const newY = y + dy;
      const newX = x + dx;
      if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) {
        moves.push([newY, newX]);
      }
    }
    // console.log(moves);
    // for (const [y, x] of moves) {
    //   this.move(y, x);
    //   // this.print(this.board);
    // }
    return moves;
  }
  KnightMoves([startY, startX], [endY, endX]) {
    this.destinationFinder([startY, startX], [endY, endX]);
    // send current location start and for location is end
    // destinationFinder will be the one given shortest path
    // move method will be the one to go
  }
  destinationFinder([startY, startX], [endY, endX]) {
    //before finding the shortest solution i should put all the possible route to go that distination
    // only put queue if the edge is not on the visited yet

    // Task convert the edge into some string and put all on the queue
    const edges = this.legalMoves(startY, startX);
    const visited = new Set();
    const queue = [];

    const targetDestination = [endY, endX].join(",");
    let found = false;

    edges.forEach((coord) => {
      const coordStr = this.stringifyCoord(coord);
      queue.push(coordStr);
      visited.add(coordStr);
    });

    while (found !== true) {
      const current = queue.shift();
      if (current === targetDestination) {
        found = true;
        console.log("found");
        return;
      }

      const [x, y] = this.parseCoord(current);
      const nextMoves = this.legalMoves(x, y);
      nextMoves.forEach((coord) => {
        const coordStr = this.stringifyCoord(coord);

        if (!visited.has(coordStr)) {
          queue.push(coordStr);
          visited.add(coordStr);
          console.log(coordStr);

          const [newy, newx] = this.parseCoord(coordStr);

          console.log("--------------------");
          this.move(newy, newx);
        }
        console.log(queue);
      });
    }
  }
  //helper method
  parseCoord(coordStr) {
    return coordStr.split(",").map(Number);
  }

  stringifyCoord(coordArr) {
    return coordArr.join(",");
  }
}
const chess = new ChessBoard();

chess.move(1, 8);
chess.board;
chess.KnightMoves([5, 4], [6, 6]);
