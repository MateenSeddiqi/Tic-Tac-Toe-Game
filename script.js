let textClick= document.querySelector('p')

function changeText(){
    textClick.textContent = "Clicked"
    textClick.style.color = "red"
}

textClick.addEventListener('click', changeText)