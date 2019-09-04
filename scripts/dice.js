/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

const go = () => {
  const numDiceInput = document.getElementById('num-dice');
  const labelInput = document.getElementById('label');
  const numDice = Math.floor(numDiceInput.value);
  const label = Math.floor(labelInput.value);
  let result = `<p id='result'>Result of rolling ${numDice}d${label}:\t`;
  let total = 0;
  for (let i = 0; i < numDice; ++i) {
    let temp = Math.floor(Math.random() * label) + 1;
    total += temp;
    result += `\t<span class="die">${temp}</span>`;
  }
  result += `<br>Total: ${total}</p>`;
  document.getElementById('result').innerHTML = result;
};

// roll the dice when you click go
document.getElementById('go').addEventListener('click', go);

// roll the dice whenever enter pressed anywhere on the page
document.addEventListener('keypress', e => {
  if (e.which === 13) {
    go();
  }
});
