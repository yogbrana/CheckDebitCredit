const creditInput = document.getElementById('creditInput');
const debitInput = document.getElementById('debitInput');
const balanceDiv = document.getElementById('balance');

function calculateBalance() {
  const creditLines = creditInput.value.split('\n').map(Number).filter(n => !isNaN(n));
  const debitLines = debitInput.value.split('\n').map(Number).filter(n => !isNaN(n));

  const totalCredit = creditLines.reduce((a, b) => a + b, 0);
  const totalDebit = debitLines.reduce((a, b) => a + b, 0);

  const balance = totalCredit - totalDebit;
  balanceDiv.textContent = `Balance: ${balance}`;

  if (balance >= 0) {
    balanceDiv.style.backgroundColor = 'lightgreen';
  } else {
    balanceDiv.style.backgroundColor = 'lightcoral';
  }
}

creditInput.addEventListener('input', calculateBalance);
debitInput.addEventListener('input', calculateBalance);
