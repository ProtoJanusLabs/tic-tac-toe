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

  // this will render each time the board state changes
  const render = (activePlayer, playRound) => {
    const gameGrid = document.getElementById("gameGrid");
    gameGrid.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const gameSquare = document.createElement("div");
        const text = document.createElement("p");
        text.classList.add("gameSquareText");
        text.textContent = board[i][j];
        gameSquare.classList.add("gameSquare");

        // this event listener replaces the text content with the player token
        // and then calls playRound to do the checks for winner and the rest of the
        // round checks
        gameSquare.addEventListener("click", function () {
          if (gameGrid.classList.contains("playing") && board[i][j] === " ") {
            text.textContent = activePlayer.token;
            board[i][j] = activePlayer.token;
            playRound();
          }
        });
        gameSquare.appendChild(text);
        gameGrid.appendChild(gameSquare);
      }
    }
  };

  return { createBoard, render, board };
}

// within is the logic behid the actual game itself
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
  const infoPanel = document.getElementById("infoPanel");
  let activePlayer = players[0];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    infoPanel.innerHTML = `<p>${activePlayer.name} turn<p/>`;
  };

  const playRound = () => {
    // play round will be called after the player token is put in place in the 2D Array
    // so the first thing done is a check to see if there was a winner or a tie
    if (
      (board.board[0][0] === "X" &&
        board.board[0][1] === "X" &&
        board.board[0][2] === "X") ||
      (board.board[1][0] === "X" &&
        board.board[1][1] === "X" &&
        board.board[1][2] === "X") ||
      (board.board[2][0] === "X" &&
        board.board[2][1] === "X" &&
        board.board[2][2] === "X") ||
      (board.board[0][0] === "X" &&
        board.board[1][0] === "X" &&
        board.board[2][0] === "X") ||
      (board.board[0][1] === "X" &&
        board.board[1][1] === "X" &&
        board.board[2][1] === "X") ||
      (board.board[0][2] === "X" &&
        board.board[1][2] === "X" &&
        board.board[2][2] === "X") ||
      (board.board[0][0] === "X" &&
        board.board[1][1] === "X" &&
        board.board[2][2] === "X") ||
      (board.board[0][2] === "X" &&
        board.board[1][1] === "X" &&
        board.board[2][0] === "X") ||
      (board.board[0][0] === "O" &&
        board.board[0][1] === "O" &&
        board.board[0][2] === "O") ||
      (board.board[1][0] === "O" &&
        board.board[1][1] === "O" &&
        board.board[1][2] === "O") ||
      (board.board[2][0] === "O" &&
        board.board[2][1] === "O" &&
        board.board[2][2] === "O") ||
      (board.board[0][0] === "O" &&
        board.board[1][0] === "O" &&
        board.board[2][0] === "O") ||
      (board.board[0][1] === "O" &&
        board.board[1][1] === "O" &&
        board.board[2][1] === "O") ||
      (board.board[0][2] === "O" &&
        board.board[1][2] === "O" &&
        board.board[2][2] === "O") ||
      (board.board[0][0] === "O" &&
        board.board[1][1] === "O" &&
        board.board[2][2] === "O") ||
      (board.board[0][2] === "O" &&
        board.board[1][1] === "O" &&
        board.board[2][0] === "O")
    ) {
      // if there was a winner send over the winner info
      endGame(activePlayer);
    } else if (
      board.board[0][0] !== " " &&
      board.board[0][1] !== " " &&
      board.board[0][2] !== " " &&
      board.board[1][0] !== " " &&
      board.board[1][1] !== " " &&
      board.board[1][2] !== " " &&
      board.board[2][0] !== " " &&
      board.board[2][1] !== " " &&
      board.board[2][2] !== " "
    ) {
      // if there was a tie, send over the tie info
      endGame({ name: "tie" });
    } else {
      // if no win or tie, then switch to the next player and then rerender the board
      switchActivePlayer();
      board.render(activePlayer, playRound);
    }
  };

  const endGame = (activePlayer) => {
    // here we show the modal at the end of the game, and change the result to what happened
    const modal = document.querySelector("[data-modal]");
    const gameResult = document.getElementById("gameResult");
    const resetButton = document.querySelector("[data-close-modal]");
    modal.showModal();

    if (activePlayer.name !== "tie") {
      gameResult.textContent = `${activePlayer.name} wins!`;
    } else {
      gameResult.textContent = `It was a tie!`;
    }
    resetButton.addEventListener("click", () => {
      modal.close();
      gameInitialize();
    });
  };

  const gameInitialize = () => {
    // This function resets the game to its default state for future play sessions
    const gameGrid = document.getElementById("gameGrid");
    const playButton = document.createElement("button");

    // init values
    gameGrid.classList.remove("playing");
    playButton.setAttribute("id", "playButton");
    playButton.textContent = "Play";
    infoPanel.innerHTML = "";
    infoPanel.appendChild(playButton);
    activePlayer = players[0];

    // create the board from scratch and rerender it
    board.createBoard();
    board.render(activePlayer, playRound);

    // when play is clicked start the game
    playButton.addEventListener("click", function () {
      gameGrid.classList.add("playing");
      infoPanel.innerHTML = `<p>${activePlayer.name} turn<p/>`;
    });
  };

  gameInitialize();
}

GameController();
