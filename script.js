const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');
    handleInput(key);
  });
});

function handleInput(key) {
  if (key === 'C') {
    currentInput = '';
  } else if (key === '←') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === '=') {
    try {
      const expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
      currentInput = eval(expression).toString();
    } catch {
      currentInput = 'Error';
    }
  } else {
    if (currentInput === 'Error') currentInput = '';
    currentInput += key;
  }
  display.value = currentInput;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  const validKeys = '0123456789+-*/.=';
  
  if (validKeys.includes(key)) {
    handleInput(key === 'Enter' || key === '=' ? '=' : key);
  } else if (key === 'Backspace') {
    handleInput('←');
  } else if (key.toLowerCase() === 'c') {
    handleInput('C');
  }
});