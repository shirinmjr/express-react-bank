const BASE_URL = "http://localhost:3001";
const accountSummaryDiv = document.getElementById('account-summary-div');

function loadPage() {
    console.log("Account Details Page");
    getAccountInfo();

}
loadPage();

async function getAccountInfo() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountId = urlParams.get('acc');
    console.log("getting information for account: ",accountId);
    let accountInfo = await axios.get(`${BASE_URL}/accounts/${accountId}`);
    console.log(accountInfo.data);

    let accountSummaryStr = `
    <table id="summary-table">
        <tr id="account-summary-title">
          <th>Account Summary</th>
          <th></th>
        </tr>
        <tr>
          <td>Account Number</td>
          <td>${accountInfo.data._id}</td>
        </tr>
        <tr>
          <td>Account Type</td>
          <td>${accountInfo.data.type}</td>
        </tr>
        <tr>
          <td>Account Balance</td>
          <td>${accountInfo.data.balance}</td>
        </tr>
        <tr>
          <td>Account Status</td>
          <td>${accountInfo.data.status}</td>
        </tr>
      </table>`;
    accountSummaryDiv.innerHTML = accountSummaryStr;
  
}