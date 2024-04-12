function Gameboard() {
  const rows = 3;
  const columns = 3;

  const board = [];

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(" ");
      }
    }
  };

  const render = () => {
    const gameGrid = document.getElementById("gameGrid");
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const gameSquare = document.createElement("div");
        gameGrid.appendChild(gameSquare);
      }
    }
  };

  return { createBoard, render };
}

function GameController() {
  const players = [
    {
      name: "Player One",
      token: "X",
    },
    {
      name: "Player Two",
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const board = Gameboard();
  board.createBoard();
}

const board = Gameboard();
board.createBoard();
board.render();
