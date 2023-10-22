const BASE_URL = "http://localhost:3001";

import { dom } from '../pom/account.page.js';
const accountSummaryDiv = dom('accountSummaryDiv');
const accountHistoryTable = dom('accountHistoryTable');
const transactionAmountText = dom('transactionAmountText');
const selectAction = dom('selectAction');
const selectMethod = dom('selectMethod');
const selectTransferAccount = dom('selectTransferAccount');
const submitActionBtn = dom('submitActionBtn');
const transactionForm = dom('transactionForm');
const transactionMessageBox = dom('transactionMessageBox');

//Global params need for all transactions
export let accountId;
let balance;


function loadPage() {
  setDefaultUI();
  getAccountIdNumber();
  showAccountInfo(accountId);
  showHistoryInfo(accountId);
  getTransferToAccounts();
}
loadPage();

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

function getAccountIdNumber() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  accountId = urlParams.get('acc');
}

async function showAccountInfo(accountId) {
  console.log("getting summary for account: ", accountId);
  let accountInfo = await axios.get(`${BASE_URL}/accounts/${accountId}`);
  console.log("account info:", accountInfo.data, "Account Current Balance", accountInfo.data.balance);
  const type = accountInfo.data.type == 'SVG' ? 'Savings Account' : 'Checking Account';
  const status = accountInfo.data.status == true ? 'Open' : 'Closed';
  let accountSummaryStr =
    `<table id="summary-table">
        <tr id="account-summary-title"><th>Account Summary</th><th></th></tr>
        <tr><td>Account Number</td><td>${accountInfo.data.accountNumber}</td></tr>
        <tr><td>Account Type</td><td>${type}</td></tr>
        <tr><td>Account Balance</td><td>$${accountInfo.data.balance}</td></tr>
        <tr><td>Account Status</td><td>${status}</td></tr>
      </table>`;

  accountSummaryDiv.innerHTML = accountSummaryStr;
}

async function showHistoryInfo(accountId) {
  console.log("getting History for account: ", accountId);
  let accountHistoryInfo = await axios.get(`${BASE_URL}/histories/${accountId}`);
  console.log(accountHistoryInfo);
  let accountHistoryStr = "";

  accountHistoryInfo.data.forEach(history => {
    accountHistoryStr += `<tr>
    <th>${history.createdAt}</th>
    <th>${history.description}</th>
    <th>${history.transactionType}</th>
    <th>${history.method}</th>
    <th>$${history.amount}</th>
  </tr>`;
  });

  accountHistoryTable.innerHTML = accountHistoryStr;
}

async function getTransferToAccounts() {
  let transferAccountStr = "";
  let allAccountsInfo = await axios.get(`${BASE_URL}/accounts`);
  let transferToAccounts = allAccountsInfo.data.filter(account => account._id != accountId);
  console.log("All transfer to accounts: ", transferToAccounts);
  transferToAccounts.forEach(account => {
    transferAccountStr += `<option balance=${account.balance} value="${account._id}">${account.accountNumber}</option>`;
  });

  selectTransferAccount.innerHTML += transferAccountStr;
}