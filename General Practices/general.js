// JS Code for counting number of remaining characters
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



// JS code for calculating the sum of entered number by user 
let calculateSumButtonElement = document.querySelector('#calculator button');

function calculateSum(){
    let user_number= document.getElementById('user-number');
    let enteredNumber= user_number.value 
    let sumTotal=0;
    for (i= 0; i<=enteredNumber; i++){
        sumTotal = sumTotal + i;
    }
    let outputResult = document.getElementById('calculated-sum');
    outputResult.textContent = sumTotal;
    outputResult.style.display = 'block';
}
calculateSumButtonElement.addEventListener('click', calculateSum)



// JS code for highLighting links in the paragraph 
let highlightButton = document.querySelector('#highlight-links button');
function highlightLink(){
    const anchorElements = document.querySelectorAll('#highlight-links a');
    for ( const anchorElement of anchorElements ){
        anchorElement.classList.add('highlight');
    }
}

highlightButton.addEventListener('click', highlightLink);