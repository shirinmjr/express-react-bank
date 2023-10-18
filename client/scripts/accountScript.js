const BASE_URL = "http://localhost:3001";
const accountSummaryDiv = document.getElementById('account-summary-div');
const accountHistoryDiv = document.getElementById('account-history-table');
const selectAction = document.getElementById('select-action');
const selectMethod = document.getElementById('select-method');
const selectTransferAccount = document.getElementById('select-transfer-account');
const submitActionBtn = document.getElementById('submit-action');

let accountId;


function loadPage() {
  console.log("Account Details Page");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  accountId = urlParams.get('acc');
  getAccountInfo(accountId);
}
loadPage();


async function getAccountInfo(accountId) {
  console.log("getting summary for account: ", accountId);
  let accountInfo = await axios.get(`${BASE_URL}/accounts/${accountId}`);
  console.log(accountInfo.data);
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

submitActionBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const formData = new FormData(createActorForm[0]);
    let actorData = {};
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        actorData[key] = value;
    }
  console.log("Deposit for ", accountId);
  await axios.put(`${BASE_URL}/accounts/${accountId}`);
});

async function getHistoryInfo(accountId) {
  console.log("getting History for account: ", accountId);
  let accountHistoryInfo = await axios.get(`${BASE_URL}/history/${accountId}`);
  console.log(accountHistoryInfo.data);
  let accountHistoryStr = "";

  accountHistoryStr += `<table>
    <tr>
      <th>Date</th>
      <th>Transaction Description</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
    <tr>
      <td>02-01-2023</td>
      <td>Some Deposit to account</td>
      <td>D</td>
      <td>100</td>
    </tr>
    <tr>
      <td>03-01-2023</td>
      <td>Some Withdraw from account</td>
      <td>W</td>
      <td>50</td>
    </tr>
  </table>`;

  accountHistoryDiv.innerHTML = accountHistoryStr;

}














// switch (selectAction.value) {
//     case 'd':
//         console.log("Deposit");
//         selectMethod.style.visibility = "visible";
//         submitActionBtn.style.visibility = "visible";
//         break;
//     case 'w':
//         selectMethod.style.visibility = "visible";
//         submitActionBtn.style.visibility = "visible";
//         console.log("Withdraw");
//         break;
//     case 't':
//         console.log("Transfer");
//         selectTransferAccount.style.visibility = "visible";
//         break;
//     case 'c':
//         console.log("Close Account");
//         break;
//     case '':
//         selectMethod.style.visibility = "hidden";
//         submitActionBtn.style.visibility = "hidden";
//         break;