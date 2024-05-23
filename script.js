// JS variables for all IDs and elements
//////////////////////////////// 
const user1_adding_btn = document.getElementById('edit-player-1-btn');
const user2_adding_btn = document.getElementById('edit-player-2-btn');
const formElement= document.querySelector('form');
const errorOutputElement= document.getElementById('config-errors');

const playerConfigOverlay = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const overlay_cancel = document.getElementById('cancel-config-btn'); 



// JS code for opening and closing the config overlay for adding the user name
//////////////////////////////////////////////////////////////// 
function OpenPlayerConfig(){
    playerConfigOverlay.style.display = 'block';
    backdropElement.style.display = 'block';
}

function ClosePayerConfig(){
    playerConfigOverlay.style.display = 'none';
    backdropElement.style.display = 'none';
}

user1_adding_btn.addEventListener('click', OpenPlayerConfig);
user2_adding_btn.addEventListener('click', OpenPlayerConfig);

overlay_cancel.addEventListener('click', ClosePayerConfig);
backdropElement.addEventListener('click', ClosePayerConfig);


// JS code for getting the user name from user config and display it
///////////////////////////////////////////////////////////////////

function savePlayerConfig(event){
     event.preventDefault();
    const formData = new FormData(event.target);
    const playerName = formData.get('playerName').trim(); // term(); is use to remove the extra spaces like '  ' will consider as '' and '  M ' as 'M'
    if (!playerName){ // we can add the condition like this to payerName === '' 
        errorOutputElement.textContent = 'Please enter a valid player name';
        return;
    }
    console.log(playerName);
}

formElement.addEventListener('submit', savePlayerConfig);