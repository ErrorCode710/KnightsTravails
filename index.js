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
    if (this.coordValidChecker(startY, startX) && this.coordValidChecker(endY, endX)) {
      const moves = this.destinationFinder([startY, startX], [endY, endX]);
      console.log(`You made it in ${moves.length - 1} moves Here's you path: `);
      console.log(moves);
    } else {
      console.log("Invalid Move");
      return;
    }
  }

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

    let current = targetCoordStr;
    let path = [];

    while (current !== startCoordStr) {
      path.unshift(current);
      current = parentMap.get(current);
    }
    path.unshift(startCoordStr);

    return path;
  }

  //helper method

  parseCoord(coordStr) {
    return coordStr.split(",").map(Number);
  }

  stringifyCoord(coordArr) {
    return coordArr.join(",");
  }
  coordValidChecker(y, x) {
    if (y >= 0 && y < 8 && x >= 0 && x < 8) {
      return true;
    }
  }
}
class Tile {
  static count = 0;

  constructor(y, x) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");

    this.element.classList.add("chessboard__tile");
    // const isDark = (x + y) % 2 !== 0;
    this.isDark = (x + y) % 2 !== 0;
    this.element.classList.add(this.isDark ? "chessboard__tile--dark" : "chessboard__tile--light");

    this.element.dataset.coord = `${y},${x}`;

    // I want to add a number and letters in the tile
    // if the tile is y is 0 add numbers
    // if the tile is x is 7 add letters
    if (y === 0 || x === 7) {
      this.addLabel();
    }
  }
  addLabel() {
    const labelWrapper = document.createElement("div");
    // labelWrapper.classList.add("tile__label-wrapper");

    if (this.y === 0) {
      const numberLabel = document.createElement("span");

      numberLabel.classList.add("tile__label", "tile__label--top");
      numberLabel.classList.add(!this.isDark ? "tile__label--top--dark" : "tile__label--top--light");
      numberLabel.textContent = 8 - this.x;
      labelWrapper.appendChild(numberLabel);
    }
    if (this.x === 7) {
      const letterLabel = document.createElement("span");
      letterLabel.classList.add("tile__label", "tile__label--down");
      letterLabel.classList.add(!this.isDark ? "tile__label--down--dark" : "tile__label--down--light");

      const letter = ["a", "b", "c", "d", "e", "f", "g", "h"];

      letterLabel.textContent = letter[this.y];
      labelWrapper.appendChild(letterLabel);
    }

    this.element.appendChild(labelWrapper);
  }
  render() {
    return this.element;
  }
}

const knightImgPath = "LightKnight.webp";

function initializeBoardUi() {
  const boardUi = document.querySelector(".chessboard");
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = new Tile(x, y);
      boardUi.appendChild(tile.render());
    }
  }
}
function renderKnightMove(y, x) {
  const img = document.createElement("img");
  img.src = knightImgPath;
  img.alt = "Knight";
  img.classList.add("knight");

  const tile = document.querySelector(`[data-coord="${y},${x}"]`);
  tile.appendChild(img);
}

const chess = new ChessBoard();
initializeBoardUi();
renderKnightMove(0, 7);
console.log();
