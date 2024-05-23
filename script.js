const user1_adding_btn = document.getElementById('edit-player-1-btn');
const user2_adding_btn = document.getElementById('edit-player-2-btn');
// const playerConfigModel = document.querySelector('.model');

function OpenPlayerConfig(){
    // playerConfigModel.classList.remove('display-none');
}

user1_adding_btn.addEventListener('click', OpenPlayerConfig);
user2_adding_btn.addEventListener('click', OpenPlayerConfig);

