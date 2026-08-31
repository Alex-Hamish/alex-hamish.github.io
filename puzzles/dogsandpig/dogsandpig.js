const canvas = document.getElementById("game-canvas");
const startButton = document.getElementById("start");
const statusText = document.getElementById("game-status");
const typeSelect = document.getElementById("type");
const text = document.getElementById("commentary");

if (canvas) {
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.display = "block";
}

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
let selectedPiece = -1;
let AIcommentary = "Hi! I'm Piglet. I'm great at Dogs and Pig. Let's battle!"
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
    for (let i = 0; i < positions.length; i++){
        let pos = positions[i];
        let dist = Math.sqrt((x-pos.x)**2+(y-pos.y)**2);
        if (dist <= 20){
            return i;
        }
    }
    return -1;
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

function drawBoard(ismoving = false, pois = 0) {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    let moves = getMoves(pois);
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
            if (moves.includes(i)) {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.fillStyle = "black"; // Empty

        }
        if (selectedPiece === i) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 24, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        
    }
}

// GITHUB
// I WANT YOU
// TO BUILD THE JAVASCRIPT
// IT'S NOT HARD, I KNOW YOU CAN DO IT


function initializeGame() {
    if (!canvas || !startButton) {
        return;
    }

    startButton.addEventListener("click", function() {
        board = [
            0,
         0, 0, 0,
         0, 1, 0,
        -1, 0, -1,
            -1
        ];

        pos = [5,7,9,10];
        turn = 1;
        moving = false;
        selectedPiece = -1;
        drawBoard(false, 0);
    });

    canvas.addEventListener("click", function(event){
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const ind = getPiececlick(x,y);

        if (ind < 0) {
            // clicked outside a valid spot
            return;
        }

        if (turn == 1) {
            if (typeSelect.value === "piglet" && turn == 1) {
                const pigMove = piglet();
                if (pigMove !== -1) {
                    board[board.indexOf(1)] = 0; // Remove the pig from its current position
                    board[pigMove] = 1; // Move the pig to the new position
                    turn = -1; // Switch turn to dogs
                    drawBoard();
                    if (board[10] == 1) {
                        alert("Pig wins! Congrats! Click start to play again.");
                    }
                    text.value = AIcommentary; // Update the commentary text
                }
            } else {
                if (moving) {
                    const moves = getMoves(selectedPiece);
                    if (moves.includes(ind) && board[ind] == 0) {
                    board[selectedPiece] = 0;
                    board[ind] = 1;
                    selectedPiece = -1;
                    moving = false;
                    turn = -1;
                    drawBoard();
                    if (board[10] == 1) {
                        alert("Pig wins! Congrats! Click start to play again.");

                    }
                    }
                } else {
                    if (board[ind] == 1) {
                        selectedPiece = ind;
                        moving = true;
                        drawBoard(moving, selectedPiece);
                    }
                }
            }
        } else if (turn == -1) {
            if (moving) {
                const moves = getMoves(selectedPiece);
                if (moves.includes(ind) && board[ind] == 0) {
                    board[selectedPiece] = 0;
                    board[ind] = -1;
                    selectedPiece = -1;
                    moving = false;
                    turn = 1;
                    drawBoard();
                    if (board[4] == 1 && board[5] == -1 && board[1] == -1 && board[7] == -1){
                        alert("Dogs win! Congrats! Click start to play again.");
                    } else if (board[6] == 1 && board[5] == -1 && board[3] == -1 && board[9] == -1){
                        alert("Dogs win! Congrats! Click start to play again.");
                    } else if (board[0] == 1 && board[1] == -1 && board[2] == -1 && board[3] == -1){
                        alert("Dogs win! Congrats! Click start to play again.");
                    }
                } else if (board[ind] == -1) {
                    selectedPiece = ind;
                    moving = true;
                    drawBoard(moving, selectedPiece);
                }
            } else {
                if (board[ind] == -1) {
                    selectedPiece = ind;
                    moving = true;
                    drawBoard(moving, selectedPiece);
                }

                if (board[0] == -1){
                    alert("Pig wins by forcible failure! Congrats! Click start to play again.");
                }
            }
        }
    });


function piglet(){
    let pis = board.indexOf(1);
    let dogs = [board.indexOf(-1,0),board.indexOf(-1,1),board.indexOf(-1,2)]
    let moves = getMoves(pis)
    if (board == [0,0,0,0,0,1,0,-1,0,-1,-1]){
        AIcommentary = "This is the best move, also for openings, but for midgame too!."
        return 8;
    }
    // quickly remove any moves that are not valid (i.e. occupied by a dog)
    moves = moves.filter(move => board[move] == 0);
    if (moves.length == 0){ AIcommentary = "Ah! You trapped me! Good game!"; return -1; }
    if (moves.length == 1){ AIcommentary = "You nearly trapped me, but I can escape!"; return moves[0]; }
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] == 10){
            AIcommentary = "HUZZAH!!! You left your home open!"
            return 10; // wins immediately
        }
        // winning over forking
        if (board[moves[i] - 1] == -1 && board[moves[i] + 1] == -1 && (board[moves[i]] == 2 || board[moves[i]] == 5 || board[moves[i]] == 8)){
            AIcommentary = "I forked you! You need to move your piece upwards!";
            return moves[i];
        }
        if (moves[i] == 8){
            AIcommentary = "Mmmm. Perflavorous"
            return 8;
        } else if (moves[i] == 7 && moves[i] == 9){
            AIcommentary = "Move your Dog! Move your Dog!"
            if (Math.random() >= 0.5){
                return 7;
            } else {
                return 9;
            }
        }

        // ts gonna be hard, coding the movement for forcing a dog piece to move


        if (67 == 69){
            AIcommentary = "I AM HEEEE"
        } // someone in my class wanted this so here it is :P
    }
    if (moves.indexOf(5) != -1){
        AIcommentary = "The centre is open, and it's the best place!"
        return 5;
    }

    // i won against it because it made a bad move (moving to 0 insted of 1, 2 or 3) so let's make it not do that
    
    return moves[Math.floor(Math.random() * moves.length)]; // if no good moves are available, choose a random move
}

    drawBoard();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGame);
} else {
    initializeGame();
}

