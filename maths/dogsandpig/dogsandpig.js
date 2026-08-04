let board = [
     0,
  0, 0, 0,
  0, 1, 0,
 -1, 0, -1,
    -1
] // 1 is pig, -1 is dog, 0 is empty


function getMoves(pos) {
    let moves = [];
    if (board[pos] == 0) {
        return [0];
    } else {
        if (board[pos] == 1) {
            switch (pos) {
                case 0:
                    moves = [1, 2, 3];
                    break;
                case 1:
                    moves = [0, 2, 4, 5];
                    break;
                case 2:
                    moves = [0, 1, 3, 5];
                    break;
                case 3:
                    moves = [0, 2, 5, 6];
                    break;
                case 4:
                    moves = [1, 5, 7];
                    break;
                case 5:
                    moves = [1, 2, 3, 4, 6, 7, 8, 9];
                    break;
                case 6:
                    moves = [3, 5, 9];
                    break;
                case 7:
                    moves = [4, 5, 8, 10];
                    break;
                case 8:
                    moves = [5, 7, 9, 10];
                    break;
                case 9:
                    moves = [5, 6, 8, 10];
                    break;
                case 10:
                    moves = [7, 8, 9];
            }
        } else if (board[pos] == -1) {
            switch (pos) {
                case 0:
                    moves = [];
                    break;
                case 1:
                    moves = [0, 2];
                    break;
                case 2:
                    moves = [0, 1, 3];
                    break;
                case 3:
                    moves = [0, 2];
                    break;
                case 4:
                    moves = [1, 5];
                    break;
                case 5:
                    moves = [1, 2, 3, 4, 6];
                    break;
                case 6:
                    moves = [3, 5];
                    break;
                case 7:
                    moves = [4, 5, 8];
                    break;
                case 8:
                    moves = [5, 7, 9];
                    break;
                case 9:
                    moves = [5, 6, 8];
                    break;
                case 10:
                    moves = [7, 8, 9];
            }
        }
    }
    return moves;
} // hardcoded ts :(

function drawBoard() {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 100);

    const positions = [
        { x: 300, y: 50 },
        { x: 150, y: 150 },
        { x: 300, y: 150 },
        { x: 450, y: 150 },
        { x: 100, y: 300 },
        { x: 300, y: 300 },
        { x: 500, y: 300 },
        { x: 150, y: 450 },
        { x: 300, y: 450 },
        { x: 450, y: 450 },
        { x: 300, y: 550 }
    ];

    for (let i = 0; i < board.length; i++) {
        const pos = positions[i];
        if (board[i] === 1) {
            ctx.fillStyle = "pink"; // Pig
        } else if (board[i] === -1) {
            ctx.fillStyle = "brown"; // Dog
        } else {
            ctx.fillStyle = "black"; // Empty
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        ctx.fill();

    }
}


drawBoard();


document.getElementById("start").addEventListener("click", function() {
    board = [
        0,
     0, 0, 0,
     0, 1, 0,
    -1, 0, -1,
        -1
    ]
    drawBoard();
});