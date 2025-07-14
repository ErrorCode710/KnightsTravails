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
  // destinationFinder([startY, startX], [endY, endX]) {
  //   //before finding the shortest solution i should put all the possible route to go that distination
  //   // only put queue if the edge is not on the visited yet

  //   // Task convert the edge into some string and put all on the queue
  //   // const edges = this.legalMoves(startY, startX);
  //   const visited = new Set();
  //   const queue = [];
  //   const parentMap = new Map();

  //   const targetDestination = [endY, endX].join(",");
  //   const startCoordStr = [startY, startX].join(",");

  //   let current = targetDestination;
  //   let path = [targetDestination];
  //   console.log("This is Path", path);

  //   edges.forEach((coord) => {
  //     const coordStr = this.stringifyCoord(coord);
  //     queue.push(coordStr);
  //     visited.add(coordStr);
  //   });

  //   while (queue.length > 0) {
  //     const currentCoord = queue.shift();

  //     if (currentCoord === targetDestination) {
  //       console.log("Target found at", currentCoord);
  //       return;
  //     }

  //     const queuedCoord = this.parseCoord(currentCoord); // For Converting String to Number to use as arguements
  //     const neighbors = this.legalMoves(queuedCoord[0], queuedCoord[1]);

  //     neighbors.forEach((coord) => {
  //       const coordStr = this.stringifyCoord(coord);

  //       if (!visited.has(coordStr)) {
  //         queue.push(coordStr);
  //         visited.add(coordStr);
  //         parentMap.set(coordStr, queuedCoord);
  //         console.log("This is parentMap inside");
  //         console.log(parentMap);
  //         console.log(coordStr);

  //         const [newy, newx] = this.parseCoord(coordStr);

  //         console.log("--------------------");
  //         this.move(newy, newx);
  //       }
  //     });
  //   }

  //   while (current !== targetDestination) {
  //     current = parentMap.get(current);
  //     current = parent.join(",");
  //     path.unshift(current);
  //   }

  //   console.warn("Target not reachable");
  // }
  destinationFinder([startY, startX], [endY, endX]) {
    //before finding the shortest solution i should put all the possible route to go that distination
    // only put queue if the edge is not on the visited yet

    // Task convert the edge into some string and put all on the queue
    // const edges = this.legalMoves(startY, startX);
    const visited = new Set();
    const queue = [];
    const parentMap = new Map();

    const targetCoordStr = [endY, endX].join(",");
    const startCoordStr = [startY, startX].join(",");

    queue.push(startCoordStr);
    visited.add(startCoordStr);

    let found = false;

    while (queue.length > 0) {
      const currentCoord = queue.shift();

      console.log(`This is the currentCoor and target coord: ${currentCoord} , ${targetCoordStr}`);
      if (currentCoord === targetCoordStr) {
        found = true;

        console.log("Target found at", currentCoord);
        break;
      }

      const queuedCoord = this.parseCoord(currentCoord);
      const neighbors = this.legalMoves(queuedCoord[0], queuedCoord[1]);

      neighbors.forEach((coord) => {
        const coordStr = this.stringifyCoord(coord);

        if (!visited.has(coordStr)) {
          visited.add(coordStr);
          queue.push(coordStr);
          parentMap.set(coordStr, currentCoord);

          // this.move(newy, newx);
        }
      });
    }

    if (!found) {
      console.warn("Target not reachable");
      return;
    }
    // For Constructing the shortest path
    console.log(parentMap);
    let current = targetCoordStr;
    let path = [];

    while (current !== startCoordStr) {
      path.unshift(current);
      current = parentMap.get(current);
    }
    path.unshift(startCoordStr);

    return path;
    console.log("Shortest Path:", path);
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
chess.KnightMoves([3, 1], [6, 6]);
