// This code use for for addEventListener by click
// let textClick= document.querySelector('p')

// function changeText(){
//     textClick.textContent = "Clicked"
//     textClick.style.color = "red"
// }
// textClick.addEventListener('click', changeText)


let userMessage = document.getElementById('user-message');
let remainText = document.getElementById('remaining-texts');
let maxAllowedText = userMessage.maxLength; 

function updateRemainingText(event){
    let enteredText = event.target.value;
    let enteredTextLength = enteredText.length;
    let remainTextLength = maxAllowedText - enteredTextLength;
    remainText.textContent = remainTextLength;

    // let textLength = userMessage.value.length;
    // remainText.textContent = 70 - textLength;
    // if(textLength > 70){
    //     remainText.style.color ='red';
    // }else{
    //     remainText.style.color = 'black';
    // }   
}

userMessage.addEventListener('input', updateRemainingText);