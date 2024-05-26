// JS variables for all IDs and elements
//////////////////////////////// 
const user1_adding_btn = document.getElementById('edit-player-1-btn');
const user2_adding_btn = document.getElementById('edit-player-2-btn');
const formElement= document.querySelector('form');
const errorOutputElement= document.getElementById('config-errors');
const playerNameInput = document.getElementById('playername');
const playerConfigOverlay = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const overlay_cancel = document.getElementById('cancel-config-btn'); 
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;
const players = [         // this code is use to store the name and symbol of the player
    {
        name: '',
        Symbol: 'X'
    },
    {
        name: '',
        Symbol: 'O'
    },
];


// start game variables
//////////////////////
const startNewGameBtnElement = document.getElementById('start-game-btn');
const gameAreaElement = document.getElementById('active-game');
const activePlayerNameElement = document.getElementById('active-payer-name');
// const gameFieldElements = document.querySelectorAll('#game-board li'); // For both querySelector and querySelectorAll we should add the html element
const gameBoardElement = document.getElementById('game-board');
const gameOverElement = document.getElementById('game-over');

// JS code for opening and closing the config overlay for adding the user name
//////////////////////////////////////////////////////////////// 
function OpenPlayerConfig(event){
    editedPlayer = +event.target.dataset.playerid; // this code use to take the player ID when user click on edit btn it mean:  +'1' = > 1
    playerConfigOverlay.style.display = 'block';
    backdropElement.style.display = 'block';
}

function ClosePayerConfig(){
    playerConfigOverlay.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorOutputElement.textContent = '';
    playerNameInput.value = '';

}
// Add EventListener for both player name btn and closing the overlay and backdrop
user1_adding_btn.addEventListener('click', OpenPlayerConfig);
user2_adding_btn.addEventListener('click', OpenPlayerConfig);

overlay_cancel.addEventListener('click', ClosePayerConfig);
backdropElement.addEventListener('click', ClosePayerConfig);


// JS code for getting the user name from user config and display it in the player name field
///////////////////////////////////////////////////////////////////

function savePlayerConfig(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playerName').trim(); // term(); is use to remove the extra spaces like '  ' will consider as '' and '  M ' as 'M'
    if (!enteredPlayerName){ // we can add the condition like this to payerName === '' 
        event.target.firstElementChild.classList.add('error');
        errorOutputElement.textContent = 'Please enter a valid player name';
        return;
    }
    const dataPlayerDataElement = document.getElementById('player-'+ editedPlayer + '-data');
    dataPlayerDataElement.children[1].textContent = enteredPlayerName;

    // if (editedPlayer === 1 ){            // This if first check the player ID and store it in player array 
    //     players[0]=enteredPlayerName;
    // }else {
    //     players[1]=enteredPlayerName;
    // }

    players[editedPlayer - 1].name = enteredPlayerName;  //This code store the name of both players in the array
    ClosePayerConfig();
}
formElement.addEventListener('submit', savePlayerConfig);


// Start Game section 

function restGameStatus() {
    gameIsOver= false;
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You Win <span id="winner-player">Player Name </span>';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame(){
    if(players[0].name === '' || players[1].name === ''){
        // errorOutputElement.textContent = 'Please enter a valid player name';
        alert('Please set player names for both players');
        return;
    }

    restGameStatus();
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}
startNewGameBtnElement.addEventListener('click', startNewGame);

function SwitchPlayer(){
    if (activePlayer === 0){
        activePlayer = 1;
    } else{
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}


function selectGameField(event){
    if (event.target.tagName !== 'LI' || gameIsOver === true ){
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert(' Please select an empty field');      
        return
    }

    selectedField.textContent = players[activePlayer].Symbol;
    selectedField.classList.add('disabled');
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();
    if (winnerId !==0){
        endGame(winnerId);
    }
    currentRound++
    SwitchPlayer();
}

// for (const gameFieldElement of gameFieldElements){ // This for eventlistener create add eventlistener for all game fields
//     gameFieldElement.addEventListener('click', selectGameField);
// }

gameBoardElement.addEventListener('click', selectGameField)

function checkForGameOver() {
    // Checking the row for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2] 
        ) {
            return gameData [i][0];
        }
    }

    // Checking the rows for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i] 
        ) {
            return gameData [0][i];
        }
    }

    // Diagonal: Top let to bottom right 
    if (
        gameData[0][0] > 0 && 
        gameData[0][0] === gameData[1][1] && 
        gameData[0][0] === gameData[2][2]
    ){
        return gameData[0][0];
    }

    // Diagonal: bottom let to top right 
    if (
        gameData[2][0] > 0 && 
        gameData[2][0] === gameData[1][1] && 
        gameData[1][1] === gameData[0][2]
    ){
        return gameData[2][0];
    }
    // Checking for draw
    if (currentRound === 9){
        return -1;
    }

    return 0;
}

function endGame(winnerId){
    gameIsOver= true;
    gameOverElement.style.display = 'block';
    if (winnerId > 0){
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName; 
    }else{
        gameOverElement.firstElementChild.textContent = 'It\'s a draw';
    }
    
}