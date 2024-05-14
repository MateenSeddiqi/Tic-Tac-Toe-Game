// This code use for for addEventListener by click
// let textClick= document.querySelector('p')

// function changeText(){
//     textClick.textContent = "Clicked"
//     textClick.style.color = "red"
// }
// textClick.addEventListener('click', changeText)


let userInput = document.getElementById('user-input');
let remainInput = document.getElementById('remaining-inputs');
let maxAllowedText = userInput.maxLength; 

function updateRemainingInput(){
    let inputLength = userInput.value.length;
    let remainInputLength = maxAllowedText - inputLength;
    remainInput.textContent = remainInputLength;

    if(inputLength >=  50){
        remainInput.style.color ='red';
    }else{
        remainInput.style.color = 'black';
    }
}
userInput.addEventListener('input', updateRemainingInput);