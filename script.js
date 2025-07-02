// Dark mode toggle
const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click', () => {
  if(document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  }
});

// Apply saved theme on load
if(localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleBtn.textContent = 'Light Mode';
}

// Account management logic
const accountsSelect = document.getElementById('accounts');
const newAccountInput = document.getElementById('newAccountName');
const createAccountBtn = document.getElementById('createAccount');
const deleteAccountBtn = document.getElementById('deleteAccount');
const debitNote = document.getElementById('debitNote');
const creditNote = document.getElementById('creditNote');

let accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
let currentAccount = localStorage.getItem('currentAccount');

function saveAccounts() {
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

function saveCurrentAccount() {
  localStorage.setItem('currentAccount', currentAccount);
}

function loadAccount(name) {
  debitNote.value = accounts[name]?.debit || '';
  creditNote.value = accounts[name]?.credit || '';
}

function updateAccountsDropdown() {
  accountsSelect.innerHTML = '';
  Object.keys(accounts).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    accountsSelect.appendChild(option);
  });
  if(currentAccount && accounts[currentAccount]) {
    accountsSelect.value = currentAccount;
    loadAccount(currentAccount);
  } else if(Object.keys(accounts).length > 0) {
    currentAccount = Object.keys(accounts)[0];
    accountsSelect.value = currentAccount;
    loadAccount(currentAccount);
  } else {
    currentAccount = null;
    debitNote.value = '';
    creditNote.value = '';
  }
  saveCurrentAccount();
}

// Save notes on input
debitNote.addEventListener('input', () => {
  if(!currentAccount) return;
  accounts[currentAccount] = accounts[currentAccount] || {};
  accounts[currentAccount].debit = debitNote.value;
  saveAccounts();
});

creditNote.addEventListener('input', () => {
  if(!currentAccount) return;
  accounts[currentAccount] = accounts[currentAccount] || {};
  accounts[currentAccount].credit = creditNote.value;
  saveAccounts();
});

// Change account selection
accountsSelect.addEventListener('change', () => {
  currentAccount = accountsSelect.value;
  loadAccount(currentAccount);
  saveCurrentAccount();
});

// Create new account
createAccountBtn.addEventListener('click', () => {
  const name = newAccountInput.value.trim();
  if(!name) {
    alert('Please enter an account name');
    return;
  }
  if(accounts[name]) {
    alert('Account already exists');
    return;
  }
  accounts[name] = { debit: '', credit: '' };
  currentAccount = name;
  updateAccountsDropdown();
  newAccountInput.value = '';
});

// Delete current account
deleteAccountBtn.addEventListener('click', () => {
  if(!currentAccount) {
    alert('No account selected');
    return;
  }
  if(confirm(`Delete account "${currentAccount}"? This cannot be undone.`)) {
    delete accounts[currentAccount];
    currentAccount = null;
    updateAccountsDropdown();
  }
});

// Initialize dropdown on load
updateAccountsDropdown();
