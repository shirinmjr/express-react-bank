
const BASE_URL = "http://localhost:3001";
const createSVGBtn = document.getElementById("create-svg");
const createCHKBtn = document.getElementById("create-chk");
const accountsContainer = document.getElementById("accounts-container");
let accountsBtn;

function loadPage() {
    console.log("Welcome to Express Bank");
    getAllAccounts();
}
loadPage();

async function getAllAccounts() {
    let accountsDisplayStr = "";
    try {
        console.log("Getting all accounts...");
        const allAccounts = await axios.get(`${BASE_URL}/accounts`);
        console.log(allAccounts.data);
        allAccounts.data.forEach((account) => {
            let status = account.status ? "Open" : "Closed";
            let type = account.type === "SVG" ? "Savings Account" : "Checking Account";
            accountsDisplayStr +=
                `<a class="button account-link" href="/client/account.html?acc=${account._id}">
                <button class="account-btn primary-btn">
                <table class="account-info">
                <tr class="account-row"><td class="account-data">Account Number:<br/>${account.accountNumber}</td></tr>
                <tr class="account-row" id=""account-type"><td> ${type}</td></tr>
                <tr class="account-row"><td class="account-data">Status: ${status}</td></tr>
                <tr class="account-row"><td class="account-data" id="account-balance-display">Balance: $${account.balance}</td></tr>
                </table></button></a>`;
        });
        accountsContainer.innerHTML = accountsDisplayStr;
        document.querySelectorAll(".account-link").forEach(account => {
            account.addEventListener("click", (e) => {
                console.log("Redirect to account page...");
            });
        });
    } catch (err) {
        console.log(err);
    }
}

createSVGBtn.addEventListener('click', async (e) => {
    console.log("creating a new Checking account...");
    let body = {
        accountNumber: Math.floor(100000000 + Math.random() * 999999999),
        type: "SVG",
        balance: 0,
        status: true,
    };
    try {
        let newAccount = await axios.post(`${BASE_URL}/accounts`, body);
        console.log(newAccount);
        loadPage();
    } catch (err) {
        console.log(err);
    }

});

createCHKBtn.addEventListener('click', async (e) => {
    console.log("creating a new Checking account...");
    let body = {
        accountNumber: Math.floor(100000 + Math.random() * 900000),
        type: "CHK",
        balance: 0,
        status: true,
    };
    try {
        let newAccount = await axios.post(`${BASE_URL}/accounts`, body);
        console.log(newAccount);
        loadPage();
    } catch (err) {
        console.log(err);
    }

});