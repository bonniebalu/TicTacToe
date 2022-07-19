/*
* JS-based Tic Tac Toe game with minor AI elements
* designed and developed by Bonnie Balu 2022
*/

let gameBoard;
let computer = 'o';
let user = 'x';
let gameOver;
let waiting = false;

function newGame(){
    gameOver = false;
    gameBoard = [['', '', ''],['', '', ''],['', '', '']];
    setMessage("Make your move");

    if(Math.floor(Math.random() * 2 < 1))
        computersMove();
}            

function squareClicked(x,y) {
    console.log("x: " + x + " y: " + y);
    
    if (waiting || gameOver || gameBoard[x][y] !== '') return;

    updateCell(x, y, user);

    if (!isGameOver()){
        setMessage("Computer is thinking...");

        waiting = true;
        setTimeout(() => { 
            computersMove();
            waiting = false;
        }, 1000);
    }
}

function computersMove(){
    let picked = false;

    // try some strategies

    // look for a line with 2 same values, and one blank one
    if (!canOnePlayerWin(computer, computer) && !canOnePlayerWin(user, computer)) {
        // randomly pick a free slot
        while (picked == false) {
            const row = Math.floor(Math.random() * 3);
            const col = Math.floor(Math.random() * 3);
            if (gameBoard[row][col] === ''){                        
                updateCell(row, col, computer);
                picked = true;
            }
        }
    }

    if (!isGameOver()){
        setMessage("Your turn");
    }
}

function updateCell(x,y,value) {
    gameBoard[x][y] = value;
    document.getElementById("row-" + x + "-col-" + y).innerText = value;
}

function isGameOver(){
    // game is over in two cases:

    // there is a line
    if (hasLine(computer)) {
        setMessage("You Lose :(");
        gameOver = true;
    }
    else if (hasLine(user)) {
        setMessage("You Win!");
        gameOver = true;
    }

    // or all spaces have been used
    else if (!hasOpenSpace()) {
        setMessage("Draw");
        gameOver = true;
    }

    return gameOver;
}

function canOnePlayerWin(player, value) {

    const potentialPlayerWin = player + player + '';

    // horizontal line
    for (let x = 0; x < 3; x++) {
        if (getLineValue(x, 0, x, 2) === potentialPlayerWin) {                        
            const coordinates = getEmptyValueCoordinatesInLine(x, 0, x, 2);
            updateCell(coordinates.x, coordinates.y, value);
            return true;
        }
    }

    // vertical line
    for (let y = 0; y < 3; y++) {
        if (getLineValue(0, y, 2, y) === potentialPlayerWin) {                        
            const coordinates = getEmptyValueCoordinatesInLine(0, y, 2, y);
            updateCell(coordinates.x, coordinates.y, value);
            return true;
        }
    }

    // diagonals
    if (getLineValue(0, 0, 2, 2) === potentialPlayerWin) {
        const coordinates = getEmptyValueCoordinatesInLine(0, 0, 2, 2);
        updateCell(coordinates.x, coordinates.y, value);
            return true;
    }
    else if (getLineValue(2, 0, 0, 2) === potentialPlayerWin) {
        const coordinates = getEmptyValueCoordinatesInLine(2, 0, 0, 2);
        updateCell(coordinates.x, coordinates.y, value);
        return true;
    }

    return false;
}

function getEmptyValueCoordinatesInLine(x1, y1, x3, y3){
    let emptyX, emptyY;
    const x2 = (x1+x3)/2;
    const y2 = (y1+y3)/2;

    if (gameBoard[x1][y1] === '')
    {
        emptyX = x1;
        emptyY = y1;
    }
    else if (gameBoard[x2][y2] === '')
    {
        emptyX = x2;
        emptyY = y2;
    }
    else if (gameBoard[x3][y3] === '')
    {
        emptyX = x3;
        emptyY = y3;
    }

    return {
        x: emptyX,
        y: emptyY
    };
}

function hasLine(player) {

    const playerLine = player + player + player;

    // horizontal line
    for (let x = 0; x < 3; x++) {
        if (getLineValue(x, 0, x, 2) === playerLine) {
            addWinningClass(x, 0, x, 2, player);
            return true;
        }
    }

    // vertical line
    for (let y = 0; y < 3; y++) {
        if (getLineValue(0, y, 2, y) === playerLine) {
            addWinningClass(0, y, 2, y, player);
            return true;
        }
    }

    // diagonals
    if (getLineValue(0, 0, 2, 2) === playerLine) {
        addWinningClass(0, 0, 2, 2, player);
        return true;
    }
    else if (getLineValue(2, 0, 0, 2) === playerLine) {
        addWinningClass(2, 0, 0, 2, player);
        return true;
    }

    return false;
}

function addWinningClass (x1, y1, x3, y3, player) {
    const x2 = (x1+x3)/2;
    const y2 = (y1+y3)/2;

    const className = player === computer ? "forTheLoose" : "forTheWin";

    document.getElementById("row-" + x1 + "-col-" + y1).classList.add(className);
    document.getElementById("row-" + x2 + "-col-" + y2).classList.add(className);
    document.getElementById("row-" + x3 + "-col-" + y3).classList.add(className);
}

function getLineValue(x1, y1, x3, y3) {
    let line = '';

    const x2 = (x1+x3)/2;
    const y2 = (y1+y3)/2;

    line += gameBoard[x1][y1];
    line += gameBoard[x2][y2];
    line += gameBoard[x3][y3];

    return line;
}

function hasOpenSpace() {
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            if (gameBoard[x][y] === '') {
                return true;
            }
        }
    }

    return false;
}

function setMessage(value) {
    document.getElementById('output-message').innerText = value;
}

newGame();