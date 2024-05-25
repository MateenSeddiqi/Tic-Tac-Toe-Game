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

let editedPlayer = 0;
const players = [ // this code is use to store the name and symbol of the player
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
const startNewGameBtnElement = document.getElementById('start-game-btn');

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
// Add EvntListener for both player name btn and closing the overlay and backdrop
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

    if (editedPlayer === 1 ){ // This if first check the player ID and store it in player array 
        players[0]=enteredPlayerName;
    }else {
        players[1]=enteredPlayerName;
    }
    ClosePayerConfig();
}
formElement.addEventListener('submit', savePlayerConfig);


// Start Game section
startNewGameBtnElement.addEventListener('click');
