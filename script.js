
// Select HTML Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.querySelector(".reset");

// Game Variables
let currentPlayer = "X";
let gameActive = true;

// Winning Conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add Click Event to Every Cell
cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        // Check if cell is already filled
        if (cell.textContent !== "" || !gameActive) {
            return;
        }

        // Set Current Player
        cell.textContent = currentPlayer;

        // Check Winner
        checkWinner();

        // Change Player
        if (gameActive) {

            currentPlayer =
                currentPlayer === "X" ? "O" : "X";

            statusText.textContent =
                "Player " + currentPlayer + "'s Turn";
        }

    });

});

// Check Winner Function
function checkWinner() {

    let winner = false;

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {

            winner = true;
            break;
        }
    }

    // Winner Found
    if (winner) {

        statusText.textContent =
            "Player " + currentPlayer + " Wins! 🎉";

        gameActive = false;
        return;
    }

    // Check Draw
    const isDraw = [...cells].every(
        cell => cell.textContent !== ""
    );

    if (isDraw) {

        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
    }

}

// Restart Game Function
function resetGame() {

    cells.forEach((cell) => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

}

// Restart Button Event
resetButton.addEventListener("click", resetGame);
