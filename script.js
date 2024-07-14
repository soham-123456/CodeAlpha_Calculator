// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'C') {
            clear();
        } else if (value === '←') {
            deleteLast();
        } else if (value === '=') {
            evaluate();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            setOperation(value);
        } else {
            appendNumber(value);
        }
    });
});

function clear() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentInput += number;
    updateDisplay();
}

function resetScreen() {
    currentInput = '';
    shouldResetScreen = false;
}

function updateDisplay() {
    display.innerText = currentInput;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentInput;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    secondOperand = currentInput;
    currentInput = roundResult(operate(firstOperand, secondOperand, currentOperation));
    currentOperation = null;
    shouldResetScreen = true;
    updateDisplay();
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return 'Error';
            return a / b;
        default:
            return null;
    }
}