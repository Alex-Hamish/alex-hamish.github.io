const canvas = document.getElementById("game-canvas");

let board = [
     0,
  0, 0, 0,
  0, 1, 0,
 -1, 0, -1,
    -1
]; // 1 is pig, -1 is dog, 0 is empty

let pos = [5,7,9,10];
let turn = 1;
let moving = false;
function getPiececlick(x,y){
        const positions = [
        { x: 300, y: 50 },
        { x: 150, y: 200 },
        { x: 300, y: 200 },
        { x: 450, y: 200 },
        { x: 150, y: 300 },
        { x: 300, y: 300 },
        { x: 450, y: 300 },
        { x: 150, y: 400 },
        { x: 300, y: 400 },
        { x: 450, y: 400 },
        { x: 300, y: 550 }
    ];
    i = 0
    for (pos in positions){
        let dist = Math.sqrt((x-pos.x)^2+(y-pos.y)^2);
        if (dist > 20){
            // oop
            let hi = "hi";
        } else {
            return i;
        }
        i += 1;
    }
}
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

function drawBoard(ismoving, pois) {
    const ctx = canvas.getContext("2d");

    let moves = getMoves(pois)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // lines
    if (0 == 0){
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(300, 50);
        ctx.lineTo(300, 550);
        ctx.moveTo(150, 200);
        ctx.lineTo(450, 200);
        ctx.moveTo(150, 300);
        ctx.lineTo(450, 300);
        ctx.moveTo(150, 400);
        ctx.lineTo(450, 400);
        ctx.moveTo(150, 200);
        ctx.lineTo(150, 400);
        ctx.moveTo(450, 200);
        ctx.lineTo(450, 400);
        ctx.moveTo(150, 200);
        ctx.lineTo(450, 400);
        ctx.moveTo(150, 400);
        ctx.lineTo(450, 200);
        ctx.moveTo(450, 200);
        ctx.lineTo(300, 50);
        ctx.lineTo(150, 200);
        ctx.moveTo(450, 400);
        ctx.lineTo(300, 550);
        ctx.lineTo(150, 400);
        ctx.closePath();
        ctx.stroke();
    }
    // counters
    ctx.lineWidth = 0;
    const positions = [
        { x: 300, y: 50 },
        { x: 150, y: 200 },
        { x: 300, y: 200 },
        { x: 450, y: 200 },
        { x: 150, y: 300 },
        { x: 300, y: 300 },
        { x: 450, y: 300 },
        { x: 150, y: 400 },
        { x: 300, y: 400 },
        { x: 450, y: 400 },
        { x: 300, y: 550 }
    ];

    for (let i = 0; i < board.length; i++) {
        const pos = positions[i];
        if (board[i] === 1) {
            ctx.fillStyle = "pink"; // Pig
        } else if (board[i] === -1) {
            ctx.fillStyle = "brown"; // Dog
        } else {
            if (moves.includes(board[i])) {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
                ctx.fill();
            }
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
    ];
    drawBoard(false, 0);
});

document.getElementById("game-canvas").addEventListener("click", function(){
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (turn = 1){
        let ind = getPiececlick(x,y);
        if (moving){
            let moves = getMoves(pos[0]);
            if (moves.includes(ind)){
                board[pos[0]] = 0;
                board[ind] = 1;
                moving = false;
            }
        }else{
            if (board[ind] == 1){
                moving = true;
                drawBoard(moving,pos[0]);
            }
        }
    }
});