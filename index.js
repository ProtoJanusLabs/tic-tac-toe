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

  const log = () => {
    console.table(board);
  };

  return { createBoard, log };
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

  const board = Gameboard();
  board.createBoard();
}
