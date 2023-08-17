const calculatorDisplay = document.querySelector('h1');
const inputbtns = document.querySelectorAll('button');
const clearbtn = document.getElementById('clear-btn');


//values to save and output
let firstvalue = 0;
let opertatorValue = '';
let awaitingNextValue = false;


const sendNumberValue = (number) => {
    
    // replace current display value if new value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //    if the current display value is zero, we want to replace it if not we want to add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
};

//add decimal
const addDecimal = () => {
//    if operator pressed dont add decimal
    if(awaitingNextValue) return;
    //if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    } 
}

//calculate first and second values depending on operator
const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=' : (firstNumber, secondNumber) => secondNumber
}


function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    
//    to prevent multiple operator
    if(opertatorValue && awaitingNextValue) {
        opertatorValue = operator
        return;
    }
//    assign first value if not value exist
    if(!firstvalue) {
        firstvalue = currentValue;
    } else {
        const calculation = calculate[opertatorValue](firstvalue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstvalue = calculation;
    }
    // reayd for next value
    awaitingNextValue = true
    opertatorValue = operator;

}
//add event listeners for numbers and decimals

inputbtns.forEach((inputbtn) => {
    if(inputbtn.classList.length === 0){
        inputbtn.addEventListener('click',() => sendNumberValue(inputbtn.value));
    } else if(inputbtn.classList.contains('operator')){
        inputbtn.addEventListener('click',() => useOperator(inputbtn.value));
    } else if(inputbtn.classList.contains('decimal')) {
        inputbtn.addEventListener('click',() => addDecimal());
    }
});

// reset button

const resetAll = () => {
    calculatorDisplay.textContent = '0';
    firstvalue = 0;
    opertatorValue = '';
    awaitingNextValue = false;
}

//event listener
clearbtn.addEventListener('click', resetAll);