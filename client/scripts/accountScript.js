const BASE_URL = "http://localhost:3001";
const accountSummaryDiv = document.getElementById('account-summary-div');
const accountHistoryDiv = document.getElementById('account-history-table');
const transactionAmountText = document.getElementById('transaction-amount');
const selectAction = document.getElementById('select-action');
const selectMethod = document.getElementById('select-method');
const selectTransferAccount = document.getElementById('select-transfer-account');
const submitActionBtn = document.getElementById('submit-action');
const transactionForm = document.getElementById('transaction-form');
const transactionMessageBox = document.getElementById('message-box');



let accountId;
let balance;


function loadPage() {
  console.log("Account Details Page");
  getAccountIdNumber();
  setDefaultUI();
  getAccountInfo(accountId);
}
loadPage();

//Account Page Setup
function getAccountIdNumber() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  accountId = urlParams.get('acc');
}

function setDefaultUI() {
  submitActionBtn.style.visibility = "visible";
  selectMethod.style.visibility = "hidden";
  selectTransferAccount.style.visibility = "hidden";
  transactionAmountText.value = "";
  transactionAmountText.placeholder = "$Amount";
  selectAction.selectedIndex = 0;
  selectMethod.selectedIndex = 0;
  selectTransferAccount.selectedIndex = 0;
}

async function getAccountInfo(accountId) {
  console.log("getting summary for account: ", accountId);
  let accountInfo = await axios.get(`${BASE_URL}/accounts/${accountId}`);
  console.log(accountInfo.data);
  balance = accountInfo.data.balance;
  console.log(balance);
  const type = accountInfo.data.type == 'SVG' ? 'Savings Account' : 'Checking Account';
  const status = accountInfo.data.status == true ? 'Open' : 'Closed';
  let accountSummaryStr = `
    <table id="summary-table">
        <tr id="account-summary-title"><th>Account Summary</th><th></th></tr>
        <tr><td>Account Number</td><td>${accountInfo.data.accountNumber}</td></tr>
        <tr><td>Account Type</td><td>${type}</td></tr>
        <tr><td>Account Balance</td><td>$${accountInfo.data.balance}</td></tr>
        <tr><td>Account Status</td><td>${status}</td></tr>
      </table>`;

  accountSummaryDiv.innerHTML = accountSummaryStr;
}

//======> Update Account - Deposit Withdraw Transfer

submitActionBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const formData = new FormData(transactionForm);
  let transaction = {};
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
    transaction[key] = value;
  }
  if (formVerify(transaction)) {
    if (setTransaction(transaction, balance)) {
      await axios.put(`${BASE_URL}/accounts/${accountId}`, transaction);
    }
  }
  loadPage();
});


function formVerify(transaction) {
  if (transaction.amount == "" && transaction.action != 'c') {
    transactionMessageBox.innerText = "Amount is Required ";
    return false;
  } else if (transaction.action == "") {
    transactionMessageBox.innerText = "Action is Required ";
    return false;
  } else if ((transaction.action == 'd' || transaction.action == 'w') && transaction.method == "") {
    transactionMessageBox.innerText = "Method is Required";
    selectAction.selectedIndex = 0;
    return false;
  } else if (transaction.action == 't') {
    transactionMessageBox.innerText = "Transfer to Account is Required";
    return false;
  } else if (transaction.action == 'c' && balance != 0) {
    transactionMessageBox.innerText = "Withdraw or transfer the balance to close";
    return false;
  }
  else {
    return true;
  }

}
function setTransaction(transaction, balance) {
  transactionMessageBox.innerText = "";
  if (transaction.action == 'd') {

    transaction.amount = balance + Number(transaction.amount);
    console.log(transaction.amount);
    return true;
  }
  else if (transaction.amount <= balance && transaction.action == 'w') {
    transaction.amount = balance - transaction.amount;
    return true;
  } else if (transaction.action == 'c') {
    closeAccount();
    return false;
  } else {
    transactionMessageBox.innerText = "Balance Not Sufficient";
    return false;


  }
}

//======> Delete Account - close account

async function closeAccount() {
  await axios.delete(`${BASE_URL}/accounts/${accountId}`);

}




async function getHistoryInfo(accountId) {
  console.log("getting History for account: ", accountId);
  let accountHistoryInfo = await axios.get(`${BASE_URL}/history/${accountId}`);
  console.log(accountHistoryInfo.data);
  let accountHistoryStr = "";

  // accountHistoryStr += `<table>
  //   <tr>
  //     <th>Date</th>
  //     <th>Transaction Description</th>
  //     <th>Type</th>
  //     <th>Amount</th>
  //   </tr>
  //   <tr>
  //     <td>02-01-2023</td>
  //     <td>Some Deposit to account</td>
  //     <td>D</td>
  //     <td>100</td>
  //   </tr>
  //   <tr>
  //     <td>03-01-2023</td>
  //     <td>Some Withdraw from account</td>
  //     <td>W</td>
  //     <td>50</td>
  //   </tr>
  // </table>`;

  accountHistoryDiv.innerHTML = accountHistoryStr;

}





selectAction.addEventListener('change', () => {
  switch (selectAction.value) {
    case 'd':
      console.log("Deposit");
      selectMethod.style.visibility = "visible";
      selectTransferAccount.style.visibility = "hidden";

      break;
    case 'w':
      console.log("Withdraw");
      selectMethod.style.visibility = "visible";
      selectTransferAccount.style.visibility = "hidden";
      break;
    case 't':
      console.log("Transfer");
      selectMethod.style.visibility = "hidden";
      selectTransferAccount.style.visibility = "visible";
      break;
    case 'c':
      console.log("Close Account");
      break;
    case '':
      selectMethod.style.visibility = "hidden";
      submitActionBtn.style.visibility = "hidden";
      break;
  }
})








